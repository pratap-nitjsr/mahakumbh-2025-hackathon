import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
import { Icon } from 'leaflet'; // Import Icon from Leaflet
// import svgd from "./pop.png"
import { statesData } from './data';
// import './App.css';

const center = [25.4661412, 81.8840872];
const fancyIcon = new Icon({
    iconUrl: "https://w7.pngwing.com/pngs/8/868/png-transparent-google-maps-hd-logo-thumbnail.png", // Replace 'path_to_your_icon_image.png' with the path to your custom marker icon
    iconSize: [16, 16], // Adjust the size of the icon
    iconAnchor: [16, 32], // Adjust the anchor point of the icon
  });
export default function MyMap() {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: '100%', height: '100vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=onCCkUs0rMxBBsgJJFlY"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

          // Logic to determine if marker should be added
          const addMarker = true
          const markerPosition = [25.473034, 81.878357];

          return (
            <React.Fragment>
              <Polygon
                pathOptions={{
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  dashArray: 3,
                  color: 'white'
                }}
                positions={coordinates}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      dashArray: "",
                      fillColor: "#BD0026",
                      fillOpacity: 0.7,
                      weight: 2,
                      opacity: 1,
                      color: "white",
                    })
                  },
                  mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                      fillOpacity: 0.7,
                      weight: 2,
                      dashArray: "3",
                      color: 'white',
                      fillColor: '#FD8D3C'
                    });
                  },
                  click: (e) => {
                    
                  }
                }}
              />
            {data &&
              Object.values(data).map((item, index) => (
            <Marker key={index} position={item.Location} />
          ))}
            </React.Fragment>
          );
        })
      }
    </MapContainer>
  );
}