import React, { useState, useEffect } from 'react';
import MyMap from './map1';
import Table from './Table1';
import firebase from 'firebase/compat/app'; // Firebase App (the core Firebase SDK)
import 'firebase/compat/database'; // Firebase Realtime Database

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_apiKey,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  databaseURL: import.meta.env.VITE_REACT_APP_databaseURL,
  projectId: import.meta.env.VITE_REACT_APP_projectId,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
  measurementId: import.meta.env.VITE_REACT_APP_measurementId
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
