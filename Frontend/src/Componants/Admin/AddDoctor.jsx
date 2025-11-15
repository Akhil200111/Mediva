import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
    email: '',
    experience: '',
    workingHours: '',
    totalAppointments: '',
    image: null,
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {

    let newErrors = {};
    
    if(!formData.name.trim()) newErrors.name = 'Name is required.';
    if(!formData.specialization.trim()) newErrors.specialization = 'Specialization is required.'
    if(!formData.contact.trim()) newErrors.contact = 'Contact is required'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if()
  }

  return (
    <div className='container'>
      <h2 className="text-center mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded bg-light">
        {[
          {label: 'Name', name: 'name', type: 'text'},
          {label: 'Specialization', name: 'specialization', type: 'text'},
          {label: 'Contact', name: 'contact', type: 'text'},
          {label: 'Email', name: 'email', type: 'email'},
          {label: 'Experience(Years)', name: 'experience', type: 'number'},
          {label: 'Working Hours', name: 'workingHours', type: 'text'},
          {label: 'Total Appointments Per Day', name: 'totalAppointments', type: 'number'}
        ].map(({label, name, type}) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name} className="form-label">{label}</label>
            <input
             type={type} 
             className="form-control"
             id={name}
             name={name}
             placeholder={`Enter ${label.toLowerCase()}`}
             value={formData[name]}
             onChange={handleChange}
           />
          </div>
        ))
        }
      </form>
    </div>
  );
}

export default AddDoctor;
