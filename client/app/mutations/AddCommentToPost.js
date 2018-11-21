import gql from 'graphql-tag';

export default gql`
mutation AddCommentToPost($id: ID, $content: String, $userId: ID) {
  addCommentToPost(id: $id, content: $content, userId: $userId) {
    comments {
      content
      user {
        firstName
        lastName
      }
    }
  }
}
`;