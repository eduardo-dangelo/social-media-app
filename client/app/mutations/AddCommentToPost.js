import gql from 'graphql-tag';

export default gql`
mutation AddCommentToPost($id: ID, $content: String ) {
  addCommentToPost(id: $id, content: $content) {
    comments {
      content
    }
  }
}
`;