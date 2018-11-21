import gql from 'graphql-tag';

export const signUp = gql`
  mutation Signup($firstName: String, $lastName: String, $email: String, $password: String) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      id
      email
    }
  }
`;

export const login = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const logout = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

export const updateUser = gql`
  mutation UpdateUser($id: ID, $firstName: String, $lastName: String, $dob: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, dob: $dob ) {
      id
      firstName
      lastName
      dob
    }
  }
`;