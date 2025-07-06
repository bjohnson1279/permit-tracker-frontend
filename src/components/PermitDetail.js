// src/components/PermitDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PERMIT_BY_ID } from '../graphql/queries';

function PermitDetail() {
  const { id } = useParams(); // Get the ID from the URL parameters
  const { loading, error, data } = useQuery(GET_PERMIT_BY_ID, {
    variables: { id }, // Pass the ID as a variable to the GraphQL query
  });

  if (loading) return <p>Loading permit details...</p>;
  if (error) return <p>Error loading permit: {error.message}</p>;
  if (!data.permit) return <p>Permit not found.</p>; // Handle case where permit doesn't exist

  const { permit } = data;

  return (
    <div className="container mt-4">
      <h2>Permit Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{permit.projectName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Permit ID: {permit.permitId}</h6>
          <p className="card-text"><strong>Applicant:</strong> {permit.applicant}</p>
          <p className="card-text"><strong>Issue Date:</strong> {permit.issueDate}</p>
          <p className="card-text"><strong>Status:</strong> {permit.status}</p>
          <p className="card-text"><strong>Description:</strong> {permit.description || 'N/A'}</p>
          <Link to={`/edit/${permit.id}`} className="btn btn-warning me-2">Edit Permit</Link>
          <Link to="/" className="btn btn-secondary">Back to List</Link>
        </div>
      </div>
    </div>
  );
}

export default PermitDetail;
