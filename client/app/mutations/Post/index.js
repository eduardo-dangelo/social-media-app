import gql from 'graphql-tag';

export const addPost = gql`
  mutation AddPost($userId: ID, $content: String) {
    addPost(userId: $userId, content: $content) {
      id
     }
   }
`;

export const likePost = gql`
  mutation likePost($id: ID, $userId: ID) {
    likePost(id: $id, userId: $userId) {
      id
      content
      likes {
        id
        user {
          id
          firstName
          lastName
        }
      }
     }
   }
`;

export const detelePost = gql`
  mutation DeletePost($id: ID) {
    deletePost(id: $id) {
      id
     }
   }
`;

export const addCommentToPost = gql`
mutation AddCommentToPost($id: ID, $content: String, $userId: ID) {
  addCommentToPost(id: $id, content: $content, userId: $userId) {
    comments {
      id
      content
      user {
        id
        firstName
        lastName
      }
    }
  }
}
`;

export const likeComment = gql`
  mutation LikeComment($id: ID, $userId: ID) {
    likeComment(id: $id, userId: $userId) {
      id
      content
      likes {
        id
        user {
          id
          firstName
          lastName
        }
      }
     }
   }
`;

export const deteleComment= gql`
  mutation DeleteComment($id: ID) {
    deleteComment(id: $id) {
      id
     }
   }
`;