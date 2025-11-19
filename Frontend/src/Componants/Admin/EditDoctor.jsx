import React, { useEffect, useState }  from 'react';
import axios from 'axios';

const EditDoctor = ({doctorId}) => {
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    specialization: '',
    workingHours: '',
    experience: '',
    image: '',
  });

  const token = localStorage.getItem('authToken');

// Fetch doctor details when component mounts

useEffect(() => {
  const fetchDoctor = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`, //Pass token for authentication
        },
      });
      console.log("response ==",response);

      setDoctor(response.data);

      setFormData({
        name: response.data.name,
        email: response.data.email,
        contact: response.data.contact,
        specialization: response.data.specialization,
        workingHours: response.data.workingHours,
        experience: response.data.experience,
        image: response.data.image,
      });
    } catch(error){
      console.error('Error fetching doctor:', error);
    }
  };

  fetchDoctor();
}, [doctorId, token])


// handle form input changes
 const handleChange = (e) => {
  const { name, value, type, files} = e.target;
 }

  return (
    <div className='container w-75'>
      
    </div>
  );
}

export default EditDoctor;
