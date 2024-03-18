import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://gdscbackend-alpha.vercel.app/api/v1/signup', formData);
      //console.log(response.uccess);
      // Handle success or redirect to another page
      console.log(response)
      if(response.data.success) alert("User Registered Successfully !!!!")
      else alert("Something Went Wrong")
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      <div className="flex-grow flex justify-center items-center">
        <div className="p-6 bg-white rounded-lg shadow-xl w-1/2" style={{ 
          backgroundImage: "url(https://craftrootsindia.com/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-19-at-11.38.52-AM-1.jpeg)",
          backgroundPosition: "center",
          backgroundSize: "cover" }}>
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          {/* Insert Link to go to login page */}
          <Link to="/login" className="text-orange-600 hover:underline hover:text-orange-800 mb-4 block">Already have an account? Login here</Link>
          {/* End of Link */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No. :</label>
              <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Designation:</label>
              <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ID:</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <button type="submit" className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-800 focus:outline-none focus:bg-blue-600">Register</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
