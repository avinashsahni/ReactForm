import React from 'react';
import { useLocation } from 'react-router-dom';
import './app.css';

const DisplayData = () => {
  const location = useLocation();
  const formData = location.state || {};

  return (
    <section>
      <div>
        <h2 className="text-2xl font-bold text-teal-900">Submitted Data</h2>
        <br />
        <div className="bg-teal-300 p-8 rounded-lg">
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Country:</strong> {formData.country?.name}</p>
          <p><strong>State:</strong> {formData.state?.name}</p>
          <p><strong>City:</strong> {formData.city?.name}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Date of Birth:</strong> {formData.dob}</p>
          <p><strong>Age:</strong> {formData.age}</p>
        </div>
      </div>
    </section>
  );
};

export default DisplayData;
