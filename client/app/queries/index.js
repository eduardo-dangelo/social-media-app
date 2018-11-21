import gql from 'graphql-tag';

export const allPosts = gql`
{
  posts {
    id
    content
    user {
      id
      firstName
      lastName
    }
    likes {
      user {
        id
        firstName
        lastName
      }
    }
    comments {
      id
      content
      user {
        id
        firstName
        lastName
      }
      likes {
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
}
`;

export const allUsers = gql`
{
  users {
    id
    firstName
    lastName
    email
  }
}
`;

export const currentUser = gql`
  {
    user {
      id
      firstName
      lastName
      email
    }
  }
`;