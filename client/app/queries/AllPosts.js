import gql from 'graphql-tag';

export default gql`
{
  posts {
    id
    title
    content
    likes
    comments {
      id
      likes
      content
  
    }
  }
}
`;