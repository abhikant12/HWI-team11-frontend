import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { cities } from '../data/Data';
import { GlobalStateContext } from '../helper/context';



const Searchcities = () => {
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [visibleCities, setVisibleCities] = useState(7);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null); 

  useEffect(() => {
    filterCities();
  }, [query]);

  const filterCities = () => {
    const filtered = cities.filter(city =>
      city.city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setVisibleCities(7); // Reset visible cities when searching
    setShowDropdown(true); // Show dropdown when typing
  };

  const handleCityClick = (cityName) => {
    const city = cities.find(city => city.city === cityName);
    setSelectedCity(city); // Store the selected city object
    setQuery(cityName);
    setShowDropdown(false);
  };

  const handleLoadMore = () => {
    setVisibleCities(prev => prev + 7);
  };

  const handleClear = () => {
    setQuery('');
    setShowDropdown(false);
    setSelectedCity(null); // Clear selected city when input is cleared
  };



const { saveData, globalData, savecoor} = useContext(GlobalStateContext);

const handleClick = async () => {
  if(selectedCity){
    try {


      const response1 = await axios.get('http://localhost:4000/api/v1/floodprobaility/riverdata', {
        params: {
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude
        }
      });


      const response2 = await axios.get('http://localhost:4000/api/v1/floodprobaility/flooddata', {
        params: {
            city:selectedCity.city,
        }
      });

      // Make the GET request to the API
      const response = await axios.get('http://localhost:4000/api/v1/floodprobaility/weatherdata', {
        params: {
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude
        }
      });

      // const response1 = await axios.get('http://localhost:4000/api/v1/floodprobaility/riverdata', {
      //   params: {
      //       latitude: selectedCity.latitude,
      //       longitude: selectedCity.longitude
      //   }
      // });

      

      const combinedData = {
        ...response.data,
        population_density_per_km2: selectedCity.population_density_per_km2,
        altitude : selectedCity.altitude,
        ...response1.data,
        ...response2.data,
      };

      console.log(combinedData);


      const severity = combinedData.Severity;
      const humanLife = combinedData.population_density_per_km2;
      const lati= selectedCity.latitude;
      const long= selectedCity.longitud;
      const altitude = selectedCity.altitude;

      const units = {
        "coord": {
          "lon": "degrees",
          "lat": "degrees"
        },
        "weather": [
          {
            "id": "weather condition ID",
            "main": "weather condition main description",
            "description": "detailed weather condition description",
            "icon": "weather icon ID"
          }
        ],
        "base": "station source",
        "main": {
          "temp": "kelvin",
          "feels_like": "kelvin",
          "temp_min": "kelvin",
          "temp_max": "kelvin",
          "pressure": "hPa",
          "humidity": "percentage",
          "sea_level": "hPa",
          "grnd_level": "hPa"
        },
        "visibility": "meters",
        "wind": {
          "speed": "meters per second",
          "deg": "degrees",
          "gust": "meters per second"
        },
        "rain": {
          "1h": "millimeters"
        },
        "clouds": {
          "all": "percentage"
        },
        "dt": "Unix timestamp (seconds since epoch)",
        "sys": {
          "type": "system type ID",
          "id": "system ID",
          "country": "country code",
          "sunrise": "Unix timestamp (seconds since epoch)",
          "sunset": "Unix timestamp (seconds since epoch)"
        },
        "timezone": "seconds offset from UTC",
        "id": "city ID",
        "name": "city name",
        "cod": "response code"
      }

      


        const response4 = await axios.post('http://localhost:4000/api/v1/aichat/chat', {
            prompt: `You are a meteorologist. Given the following parameters for the affected area:
Severity level: ${severity} (0 = None, 1 = Slight, 2 = Moderate, 3 = Severe)
Population density: ${humanLife} people per square kilometer
Elevation at latitude=${lati} and longitude=${long} , 
Altitude of the city is ${altitude} meters.

Complete data for this location: ${response.data} and units ${units}
Assess the potential impact of a flood with severity level ${severity} on the affected areas. 
Provide detailed insights into the following aspects:

Impact Assessment: Quantify the impact on infrastructure, human life, and animal life based on the severity level and the provided data. 

Mitigation Plans: Suggest possible mitigation measures and preparedness actions based on the severity and the given data and do not give general 
plans try to give some quanitified data

Emergency Contacts: Provide important contact details for nearby government officials using latitude and longitude and emergency services for assistance.
Provide only real data not the generic one
Give all the heading separated by two line breaks like there should be two lines space between impact and mitigation plans and give plane string not any styles and html on that.
Advice for use of inputs: Use population density to assess the impact on human life and determine necessary measures.Use Altitude to retrieve
 information for how long water logging can happen .  Consider the feels like temperature for evaluating its impact on people. Include contact 
 information for NDRF and relevant local authorities.`,
        });


        const finaldata = response4.data.data;

        // console.log(finaldata);
         saveData(finaldata);
       // console.log(globalData);
        savecoor({
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude
        });
      

    } catch (error) {
      console.error('Failed to retrieve data:', error.response ? error.response.data : error.message);
    }
  } else {
    console.log("No city selected");
  }
};



  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="city" className="text-lg font-medium">City</label>
        <div className="relative">
          <input
            type="text"
            id="city"
            value={query}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full pr-10"
            placeholder="Enter city name"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <svg width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm-1-9.293l2 2 2-2 1.293 1.293L9.293 8l2 2-1.293 1.293-2-2-2 2L4 10l2-2-2-2L6 3.707 8 6.707 10.293 4.414 11 5.707 8 8l-1.293-1.293z"/>
              </svg>
            </button>
          )}
          {showDropdown && query && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-y-auto z-10">
              {filteredCities.slice(0, visibleCities).map((city, index) => (
                <div
                  key={index}
                  onClick={() => handleCityClick(city.city)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {city.city}
                </div>
              ))}
              {visibleCities < filteredCities.length && (
                <button
                  onClick={handleLoadMore}
                  className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-md w-full mt-2"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <button onClick={handleClick} className='bg-green-800 hover:bg-green-700 text-white p-3 rounded-md font-bold w-full transition duration-200 ease-in-out transform hover:scale-105'>
           Get Cities
        </button>
      </div>
    </div>
  );
};

export default Searchcities;
