import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import maplibregl from "maplibre-gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import "maplibre-gl/dist/maplibre-gl.css";
import { cities } from '../data/Data'; 
import axios from 'axios';


const MAPS = () => {
  const [viewState, setViewState] = useState({
    longitude:78.9629 ,
    latitude:20.5937,
    zoom: 3.7,
  });
  const [data, setData] = useState([]);



  useEffect(() => {
    const fetchCityData = async () => {
      try {
        
        const response = await axios.get('http://localhost:4000/api/v1/floodprobaility/getSeverities');
        const severities = response.data;

        const cityDataPromises = [];

        for(let i = 0; i < cities.length; i++){
          const { latitude, longitude, city } = cities[i];

          // Find the corresponding severity for the current city
          const citySeverityData = severities.find(severityData => severityData.city === city);
          const severity = citySeverityData ? citySeverityData.severity : 0;

          // Determine color based on severity
          let color;
          switch (severity) {
            case 0:
              color = [0, 255, 0]; // Green
              break;
            case 1:
              color = [255, 255, 0]; // Yellow
              break;
            case 2:
              color = [255, 165, 0]; // Orange
              break;
            case 3:
              color = [255, 0, 0]; // Red
              break;
            default:
              color = [128, 128, 128]; // Gray for unknown severity
          }

          const cityData = {
            position: [longitude, latitude], 
            color, 
            size: 1000, 
          };

          cityDataPromises.push(Promise.resolve(cityData));
        }

        const cityData = await Promise.all(cityDataPromises);
        setData(cityData);
      } catch (error) {
        console.error("Error processing city data:", error.message || error);
      }
    };

    fetchCityData();
  }, []);

 


  // useEffect(() => {
  //   const fetchCityData = async () => {
     
  //     for(const city of cities){
  //       try {
  //         // const response = await axios.get(`http://localhost:4000/api/v1/floodprobaility/weatherdata?city=${city}`);
  //         // const { lon, lat } = response.data.coord;
  
  //         // // Add the data to the cityData array
  //         // console.log("location :- " + lon + lat);

  //         const obj = {
  //           position: [lon, lat],
  //           color: [255, 0, 0],
  //           size: 1000
  //         };
          
  //         setData(prevData => [...prevData, obj]);
         
  //       } catch (error) {
  //         console.error(`Failed to fetch data for city: ${city}`, error);
  //       }
  //     }
  //   };

  //   fetchCityData();
  // }, []);


  // const data = [
  //   { position: [12.4924, 41.8902], color: [255, 0, 0], size: 1000 }, // Red point (Rome, Colosseum)
  //   { position: [-74.006, 40.7128], color: [0, 255, 0], size: 1000 }, // Green point (New York)
  //   { position: [139.6917, 35.6895], color: [0, 0, 255], size: 1000 }, // Blue point (Tokyo)
  // ];


  const scatterplotLayer = new ScatterplotLayer({
    id: "scatterplot-layer",
    data,
    pickable: true,
    opacity: 0.8,
    radiusScale: 20,
    radiusMinPixels: 5,
    getPosition: d => d.position,
    getFillColor: d => d.color,
    getRadius: d => d.size,
  });

  const your_api_key = "YBX7vlFTpYtdEwDzh18jTeOqR3dZgtVH8Upv6xdM";

  return (
    <div>
      <DeckGL
        style={{ width: "50vw", height: "80vh", overflow: "hidden", position:"relative",   borderRadius: "10px", }}
        viewState={viewState}
        onViewStateChange={({ viewState }) => setViewState(viewState)}
        controller={true}
        layers={[scatterplotLayer]}
      >
        <StaticMap
          mapLib={maplibregl}
          mapStyle="https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json"
          transformRequest={(url, resourceType) => {
            if(!url.includes('?'))
            url = url + '?api_key=YBX7vlFTpYtdEwDzh18jTeOqR3dZgtVH8Upv6xdM';
            else{
              url = url + '&api_key=YBX7vlFTpYtdEwDzh18jTeOqR3dZgtVH8Upv6xdM';
            }
            return { url, resourceType };
          }}
        />
      </DeckGL>
    </div>
  );
    };

export default MAPS;