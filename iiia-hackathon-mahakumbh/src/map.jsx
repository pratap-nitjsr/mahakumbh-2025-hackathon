import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { statesData } from "./data";

import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { Icon } from "leaflet"; // Import Icon from Leaflet
import svgd from "./pop.png";

const center = [25.4661412, 81.8840872];
const fancyIcon = new Icon({
  iconUrl:
    "https://w7.pngwing.com/pngs/8/868/png-transparent-google-maps-hd-logo-thumbnail.png",
  iconSize: [16, 16],
  iconAnchor: [16, 32],
});

export default function MyMap() {
  const firebaseConfig = {
    apiKey: "AIzaSyAhS4VvJNsxgDW3N3gdRGcaKSDjLiPi3h8",
    authDomain: "facerecognition-a185f.firebaseapp.com",
    databaseURL: "https://facerecognition-a185f-default-rtdb.firebaseio.com",
    projectId: "facerecognition-a185f",
    storageBucket: "facerecognition-a185f.appspot.com",
    messagingSenderId: "270279767911",
    appId: "1:270279767911:web:71ac6c23181779b2a4a1c2",
    measurementId: "G-SNXQPRES1Y",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const fetchData = async () => {
    const dataRef = await firebase.database().ref("/CrowdManagement");
    dataRef.on("value", (snapshot) => {
      setData(snapshot.val());
    });

    // Remember to unsubscribe from the listener when the component unmounts
    return () => {
      dataRef.off("value");
    };
  };
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px" }} // Adjusted width to 80%
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=onCCkUs0rMxBBsgJJFlY"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {statesData.features.map((state, index) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        const addMarker = true;
        const markerPosition = [25.473034, 81.878357];

        return (
          <React.Fragment key={index}>
            <Polygon
              pathOptions={{
                fillColor: "#FD8D3C",
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: "white",
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
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 2,
                    dashArray: "3",
                    color: "white",
                    fillColor: "#FD8D3C",
                  });
                },
                click: (e) => {},
              }}
            />
            {addMarker && <Marker position={markerPosition} icon={fancyIcon} />}
          </React.Fragment>
        );
      })}
      {/* Add more markers here */}
      {data &&
        Object.values(data).map((d, index) => (
          <Marker position={[d.Location[0], d.Location[1]]} icon={fancyIcon} />
        ))}
      {/* Add as many markers as needed */}
    </MapContainer>
  );
}
