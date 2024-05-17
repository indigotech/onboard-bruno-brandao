import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(data: $input) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(data: $input) {
      birthDate
      email
      id
      name
      phone
      role
    }
  }
`;
