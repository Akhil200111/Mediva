import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

const AddRentalStaff = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    email: "",
    username: "",
    password: "",
    phone: ""
  });

  const token = localStorage.getItem('authToken'); //Assuming you're storing your auth token in localstorage

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request with form data
      const response = await axios.post(
        'http://localhost:8000/api/rentalshop/register', // Replace with your actual API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, //Include the token if needed
          },
        }
      );
      // Handle success (response.data contains the server response)
      console.log("Response:", response.data);
      alert("Staff added successfully!");
    } catch (error) {
      //Handle error (error.response contains the error from the server)
      console.error("Error:", error);
      alert("There was an error adding the staff. please try again");
    }
  };
  
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className="card p-5 shadow-lg" style={{width: "400px"}}>
        <h2 className="text-center mb-4 fw-bold">Add Rental Staff</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Shop Name</label>
            <input 
              type="text" 
              name="shopName" 
              value={FormData.shopName} 
              onChange={handleChange}
              className="form-control"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input 
              type="text" 
              name="address" 
              value={FormData.address} 
              onChange={handleChange}
              className="form-control"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input 
              type="text" 
              name="email" 
              value={FormData.email} 
              onChange={handleChange}
              className="form-control"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input 
              type="text" 
              name="phone" 
              value={FormData.phone} 
              onChange={handleChange}
              className="form-control"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input 
              type="text" 
              name="username" 
              value={FormData.username} 
              onChange={handleChange}
              className="form-control"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="text" 
              name="password" 
              value={FormData.password} 
              onChange={handleChange}
              className="form-control"
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Submit
          </button>
        </form>
      </div>
      
    </div>
  );
}

export default AddRentalStaff;
