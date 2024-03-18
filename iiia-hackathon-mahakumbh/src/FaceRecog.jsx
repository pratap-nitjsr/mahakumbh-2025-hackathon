import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { MapContainer, TileLayer, Polygon, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { statesData } from './data';
import 'leaflet/dist/leaflet.css';
import fancyMarkerIcon from './pop.png'; // Import your custom marker icon

const center = [25.4661412, 81.8840872];
const fancyIcon = new Icon({
  iconUrl: fancyMarkerIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhS4VvJNsxgDW3N3gdRGcaKSDjLiPi3h8",
    authDomain: "facerecognition-a185f.firebaseapp.com",
    databaseURL: "https://facerecognition-a185f-default-rtdb.firebaseio.com",
    projectId: "facerecognition-a185f",
    storageBucket: "facerecognition-a185f.appspot.com",
    messagingSenderId: "270279767911",
    appId: "1:270279767911:web:71ac6c23181779b2a4a1c2",
    measurementId: "G-SNXQPRES1Y"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Face() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = firebase.database().ref('/FaceRegonition');
      dataRef.on('value', (snapshot) => {
        const datas = snapshot.val();
        setData(datas);
      });

      return () => {
        dataRef.off('value');
      };
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Control room alert system</h1>
      <table className="w-full border-collapse border border-gray-300 mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Control Room</th>
            <th className="border border-gray-300 px-4 py-2">Alert Status</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-300 px-4 py-2">{key}</td>
                {value.AlertStatus === 'Normal' && (
                  <td className="border border-gray-300 px-4 py-2 text-green-500">{value.AlertStatus}</td>
                )}
                {value.AlertStatus === 'Warn' && (
                  <td className="border border-gray-300 px-4 py-2 text-red-500">{value.AlertStatus}</td>
                )}
                <td className="border border-gray-300 px-4 py-2">{`${value.Location[0]}, ${value.Location[1]}`}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <MapContainer center={center} zoom={13} className="w-full h-96 mt-6">
        <TileLayer
          url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=onCCkUs0rMxBBsgJJFlY"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        {statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

          return (
            <Polygon
              key={state.properties.name}
              pathOptions={{
                fillColor: '#FD8D3C',
                fillOpacity: 0.7,
                weight: 2,
                opacity: 1,
                dashArray: 3,
                color: 'white',
              }}
              positions={coordinates}
            />
          );
        })}
        {data &&
          Object.values(data).map((item, index) => (
            <Marker key={index} position={item.Location} icon={fancyIcon} />
          ))}
      </MapContainer>
    </div>
  );
}

export default Face;
