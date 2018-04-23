import gql from 'graphql-tag';

export default gql`
   mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;