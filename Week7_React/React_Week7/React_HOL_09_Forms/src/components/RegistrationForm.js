import React, { useState } from 'react';
import './RegistrationForm.css';

const DEPARTMENTS = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Information Technology'];

function RegistrationForm() {
  // Controlled form state
  const [formData, setFormData] = useState({ name: '', email: '', department: '' });
  // Submitted data to display
  const [submitted, setSubmitted] = useState(null);

  // Generic change handler for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted({ ...formData });
    setFormData({ name: '', email: '', department: '' });
  };

  return (
    <div className="form-wrapper">
      <form className="reg-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Department --</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>

      {/* Display submitted values */}
      {submitted && (
        <div className="result-card">
          <h3>✅ Registration Successful!</h3>
          <table>
            <tbody>
              <tr><td>Name</td><td>{submitted.name}</td></tr>
              <tr><td>Email</td><td>{submitted.email}</td></tr>
              <tr><td>Department</td><td>{submitted.department}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
