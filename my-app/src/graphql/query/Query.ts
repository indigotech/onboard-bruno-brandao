import { gql } from "@apollo/client";

export const LIST_QUERY = gql`
  query Users {
    users {
      nodes {
        email
        id
        name
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($offset: Int, $limit: Int) {
    users(data: { offset: $offset, limit: $limit }) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
