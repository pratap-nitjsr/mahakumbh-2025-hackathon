import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://gdscbackend-alpha.vercel.app/api/v1/login', formData);
       console.log(response.data);
      if(response.data.success) alert("Login Success")
      else alert("Invali Cedentials")
      // Handle success or redirect to another page
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error
    }
  };
  
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      <div className="flex-grow flex justify-center items-center">
        <div className="p-6 bg-white rounded-lg shadow-xl w-1/2 md:w-2/3 lg:w-1/3" style={{ 
          backgroundImage: "url(https://craftrootsindia.com/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-19-at-11.38.52-AM-1.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover" }}>
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          {/* Insert Link to go to register page */}
          <p className="text-orange-600">Don't have a account? </p>
          <Link to="/register" className="text-orange-600 hover:underline hover:text-orange-800 mb-4 block">Register here</Link>
          {/* End of Link */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <button type="submit" className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-blue-600">Login</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
