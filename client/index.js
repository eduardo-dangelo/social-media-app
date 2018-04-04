import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import App from './app/App';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: '/graphql',
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));