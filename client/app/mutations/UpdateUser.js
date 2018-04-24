import gql from 'graphql-tag';

export default gql`
  mutation UpdateUser($id: ID, $firstName: String, $lastName: String, $dob: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, dob: $dob ) {
      id
      firstName
      lastName
      dob
    }
  }
`;