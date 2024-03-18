import React, { useState, useEffect } from 'react';
import MyMap from './map1';
import Table from './Table1';
import firebase from 'firebase/compat/app'; // Firebase App (the core Firebase SDK)
import 'firebase/compat/database'; // Firebase Realtime Database

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

const Traffic = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = () => {
      const dataRef = firebase.database().ref('/Traffic');
      dataRef.on('value', (snapshot) => {
        setData(snapshot.val());
      });
      
      return () => {
        dataRef.off('value');
      };
    };
    
    fetchData();
  }, []);

  return (
    <div className='mt-8 flex flex-col items-center'>
      {/* Added inline style to make the heading big */}
      <h1 style={{ fontSize: '2rem' }}>Traffic Management</h1>
      <MyMap data={data} />
      <div className="mt-8">
        <Table data={data} />
      </div>
    </div>
  );
};

export default Traffic;
