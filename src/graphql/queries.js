// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_PERMITS = gql`
  query GetPermits {
    permits {
      id
      permitId
      projectName
      applicant
      issueDate
      status
    }
  }
`;

export const GET_PERMIT_BY_ID = gql`
  query GetPermitById($id: ID!) {
    permit(id: $id) {
      id
      permitId
      projectName
      applicant
      issueDate
      status
      description
    }
  }
`;
