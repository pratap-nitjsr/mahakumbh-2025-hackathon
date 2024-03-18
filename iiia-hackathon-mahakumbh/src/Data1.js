import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// import Map from 'react-map-gl';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; 
import MyMap from './maps';
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

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const position = [51.505, -0.09]


function App() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = () => {
      const dataRef = firebase.database().ref('/crowdmanagement');
      dataRef.on('value', (snapshot) => {
        setData(snapshot.val());
      });
      
      // Remember to unsubscribe from the listener when the component unmounts
      return () => {
        dataRef.off('value');
      };
    };
    
    fetchData();
  }, []);
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Data from Firebase</h1>
      {data ? (
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {Object.keys(data).map((key) => (
            <li key={key} style={{ backgroundColor: '#fff', padding: '10px 20px', marginBottom: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease' }}>
              {key} {"-->"}{data[key]}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
   

    <MyMap/>
    

    </div>
  );
}

export default App;
