
import React , {useState , useEffect} from 'react';
import MyMap from './map';
import Table from './Table';

const CrowdManagement = () => {
 
  // console.log(data)
  return (<>
    <h1 style={{"font-size":"100"}}>
    Crowd Management System
  </h1>
    <div style={{ display: 'flex', justifyContent: 'centre' , flexDirection : "column" , alignItems : "center" }}>
    
        <h1 style={{"font-size":"100"}}>
          Crowd Management System
        </h1>
      
      <div style={{ width: '80%' }}>
        <MyMap />
      </div>
      <div style={{ width: '80%' }}>
        <Table />
      </div>
      {/* {console.log(data)} */}
    </div>
    </>
  );
};

export default CrowdManagement;

