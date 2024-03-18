import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './IndexPage';
import Register from './Register';
import Login from './Login'; // Import Login component
import Traffic from './Traffic'
import Face from "./FaceRecog"
import CrowdManagement from "./CrowdManagement"
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/crowdmanagement' element={<CrowdManagement />} />
           <Route path='/face' element={<Face />} />
           <Route path='/traffic' element={<Traffic />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
