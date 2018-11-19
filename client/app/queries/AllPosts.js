import gql from 'graphql-tag';

export default gql`
{
  posts {
    id
    title
    content
    user {
      firstName
      lastName
    }
    likes {
      user {
        firstName
        lastName
      }
    }
    comments {
      id
      content
      user {
        firstName
        lastName
      }
      likes {
        user {
          firstName
          lastName
        }
      }
    }
  }
}
`;