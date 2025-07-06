// src/components/AddPermitForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PERMIT_MUTATION } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom'; // For redirection

function AddPermitForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    permitId: '',
    projectName: '',
    applicant: '',
    issueDate: '',
    status: 'Pending', // Default status
    description: ''
  });

  const [addPermit, { loading, error }] = useMutation(ADD_PERMIT_MUTATION, {
    onCompleted: () => {
      alert('Permit added successfully!');
      navigate('/'); // Redirect to the permit list after successful submission
    },
    onError: (err) => {
      alert(`Error adding permit: ${err.message}`);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.permitId || !formState.projectName || !formState.applicant || !formState.issueDate) {
      alert('Please fill in all required fields (Permit ID, Project Name, Applicant, Issue Date).');
      return;
    }
    await addPermit({ variables: formState });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Permit</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="permitId" className="form-label">Permit ID:</label>
          <input
            type="text"
            className="form-control"
            id="permitId"
            name="permitId"
            value={formState.permitId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">Project Name:</label>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="projectName"
            value={formState.projectName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="applicant" className="form-label">Applicant:</label>
          <input
            type="text"
            className="form-control"
            id="applicant"
            name="applicant"
            value={formState.applicant}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="issueDate" className="form-label">Issue Date:</label>
          <input
            type="date"
            className="form-control"
            id="issueDate"
            name="issueDate"
            value={formState.issueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={formState.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Issued">Issued</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formState.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Adding...' : 'Add Permit'}
        </button>
        {error && <p className="text-danger mt-2">Error: {error.message}</p>}
      </form>
    </div>
  );
}

export default AddPermitForm;
