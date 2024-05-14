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
