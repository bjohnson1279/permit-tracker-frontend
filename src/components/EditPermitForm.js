// src/components/EditPermitForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PERMIT_BY_ID } from '../graphql/queries';
import { UPDATE_PERMIT_MUTATION } from '../graphql/mutations';

function EditPermitForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold form data, initialized with empty strings
  const [formState, setFormState] = useState({
    permitId: '',
    projectName: '',
    applicant: '',
    issueDate: '',
    status: '',
    description: ''
  });

  // Query to fetch the existing permit data
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_PERMIT_BY_ID, {
    variables: { id },
    fetchPolicy: 'network-only' // Ensure we get fresh data, not from cache
  });

  // Mutation to update the permit
  const [updatePermit, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_PERMIT_MUTATION, {
    onCompleted: () => {
      alert('Permit updated successfully!');
      navigate(`/permit/${id}`); // Redirect to the permit details page
    },
    onError: (err) => {
      alert(`Error updating permit: ${err.message}`);
    }
  });

  // Effect to populate formState once data is loaded
  useEffect(() => {
    if (data && data.permit) {
      setFormState({
        permitId: data.permit.permitId || '',
        projectName: data.permit.projectName || '',
        applicant: data.permit.applicant || '',
        issueDate: data.permit.issueDate || '', // Date format YYYY-MM-DD
        status: data.permit.status || '',
        description: data.permit.description || ''
      });
    }
  }, [data]); // Depend on 'data' changing

  if (queryLoading) return <p>Loading permit for editing...</p>;
  if (queryError) return <p>Error loading permit: {queryError.message}</p>;
  if (!data || !data.permit) return <p>Permit not found.</p>;

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
    await updatePermit({ variables: { id, ...formState } });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Permit</h2>
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
        <button type="submit" className="btn btn-success" disabled={mutationLoading}>
          {mutationLoading ? 'Updating...' : 'Update Permit'}
        </button>
        <Link to={`/permit/${id}`} className="btn btn-secondary ms-2">Cancel</Link>
        {mutationError && <p className="text-danger mt-2">Error: {mutationError.message}</p>}
      </form>
    </div>
  );
}

export default EditPermitForm;
