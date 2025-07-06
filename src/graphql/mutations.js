// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const ADD_PERMIT_MUTATION = gql`
  mutation AddPermit(
    $permitId: String!
    $projectName: String!
    $applicant: String!
    $issueDate: String!
    $status: String!
    $description: String
  ) {
    addPermit(
      permitId: $permitId
      projectName: $projectName
      applicant: $applicant
      issueDate: $issueDate
      status: $status
      description: $description
    ) {
      id
      permitId
      projectName
      status
      issueDate
    }
  }
`;

export const UPDATE_PERMIT_MUTATION = gql`
  mutation UpdatePermit(
    $id: ID!
    $permitId: String
    $projectName: String
    $applicant: String
    $issueDate: String
    $status: String
    $description: String
  ) {
    updatePermit(
      id: $id
      permitId: $permitId
      projectName: $projectName
      applicant: $applicant
      issueDate: $issueDate
      status: $status
      description: $description
    ) {
      id
      permitId
      projectName
      status
      issueDate
    }
  }
`;

export const DELETE_PERMIT_MUTATION = gql`
  mutation DeletePermit($id: ID!) {
    deletePermit(id: $id)
  }
`;
