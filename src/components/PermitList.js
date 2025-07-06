// src/components/PermitList.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PERMITS } from '../graphql/queries';
import { DELETE_PERMIT_MUTATION } from '../graphql/mutations';
import { Link } from 'react-router-dom';

function PermitList() {
  const { loading, error, data, refetch } = useQuery(GET_PERMITS);
  const [deletePermit] = useMutation(DELETE_PERMIT_MUTATION, {
    onCompleted: () => {
      refetch(); // Refetch permits after a successful deletion to update the list
      alert('Permit deleted successfully!');
    },
    onError: (err) => {
      alert(`Error deleting permit: ${err.message}`);
    }
  });

  if (loading) return <p>Loading permits...</p>;
  if (error) return <p>Error loading permits: {error.message}</p>;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this permit?")) {
      await deletePermit({ variables: { id } });
    }
  };

  return (
    <div className="container">
      <h2>Environmental Permits</h2>
      <Link to="/add" className="btn btn-primary mb-3">Add New Permit</Link>

      {data.permits.length === 0 ? (
        <p>No permits found. Add one now!</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Permit ID</th>
              <th>Project Name</th>
              <th>Applicant</th>
              <th>Issue Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.permits.map((permit) => (
              <tr key={permit.id}>
                <td>{permit.permitId}</td>
                <td>{permit.projectName}</td>
                <td>{permit.applicant}</td>
                <td>{permit.issueDate}</td>
                <td>{permit.status}</td>
                <td>
                  <Link to={`/permit/${permit.id}`} className="btn btn-info btn-sm me-2">View</Link>
                  <Link to={`/edit/${permit.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                  <button onClick={() => handleDelete(permit.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PermitList;
