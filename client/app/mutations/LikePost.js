import gql from 'graphql-tag';

export default gql`
  mutation likePost($id: ID) {
    likePost(id: $id) {
      id
      likes
     }
   }
`;