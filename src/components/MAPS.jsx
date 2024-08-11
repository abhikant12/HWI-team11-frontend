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
    longitude: 0,
    latitude: 0,
    zoom: 1,
  });
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchCityData = () => {
      const cityData = cities.map(city => {
        const { latitude, longitude } = city;  
        return {
          position: [longitude, latitude], // [longitude, latitude]
          color: [255, 0, 0], // Red color for points
          size: 1000, // Size of the points
        };
      });
      setData(cityData);
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