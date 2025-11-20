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

  //Handle file input separately
  if(type === 'file'){
    setFormData({
      ...formData,
       [name]: files[0]
    });
  } else{
    setFormData({
      ...formData,
      [name] : value,
    });
  }
 };

 //Handle form submission

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Create a FormData object to handle file upload
  const formDataToSend = new FormData();
  for(const key in formData){
    formDataToSend.append(key, formData[key]);
  }

  try{
    // Send PUT request to upadate doctor details
    const response = await axios.put(`http://localhost:8000/api/doctors/editdoctors/${doctorId}`,formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, //Pass token for authentication
      },
    });
    alert('Doctor details updated successfully!');
    console.log(response.data);
  } catch(error) {
    console.error('Error updating doctor:',error);
    alert('Something went wrong while updating doctor details.');
  }
 };

 if(!doctor) return <p>Loading.....</p>

  return (
    <div className='container w-75'>
      <h2 className="text-center mb-4">Edit Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label htmlFor="name">Name:</label>
          <input 
             type="text" 
             name="name" 
             id="name" 
             className="form-control" 
             value={formData.name}
             onChange={handleChange}
             required
           />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="email">Email:</label>
          <input 
              type="email" 
              name="email" 
              id="email" 
              className="form-control" 
              value={formData.email}
              onChange={handleChange}
              disabled //email is not editable
          />
        </div>
        
        <div className="form-group mt-2">
          <label htmlFor="contact">Contact:</label>
          <input 
              type="text" 
              name="contact" 
              id="contact" 
              className="form-control" 
              value={formData.contact}
              onChange={handleChange}
              required 
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="specialization">Specialization:</label>
          <input 
              type="text" 
              name="specialization" 
              id="specialization" 
              className="form-control" 
              value={formData.specialization}
              onChange={handleChange}
              required
          />
        </div>
    

        <div className="form-group mt-2">
          <label htmlFor="workingHours">Working Hours:</label>
          <input 
              type="text" 
              name="workingHours" 
              id="workingHours" 
              className="form-control" 
              value={formData.workingHours}
              onChange={handleChange}
              required
          />
        </div>
    

        <div className="form-group mt-2">
          <label htmlFor="experience">Experience(years):</label>
          <input 
              type="number" 
              name="experience" 
              id="experience" 
              className="form-control" 
              value={formData.experience}
              onChange={handleChange}
              required
          />
        </div>
    

        <div className="form-group mt-2">
          <label htmlFor="image">Image:</label>
          <input 
              type="file" 
              name="image" 
              id="image" 
              className="form-control-file" 
              value={formData.image}
              onChange={handleChange}
              
          />
        </div>
    
       <button type="submit" className="btn btn-primary btn-block mt-2">
        Save Changes
       </button>

      </form>
    </div>
  );
}

export default EditDoctor;
