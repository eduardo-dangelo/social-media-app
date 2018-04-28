import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/Users';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import UserList from './components/UserList';
import ChatRoom from './components/ChatRoom';

class Users extends React.Component {
  render() {
    return (
      <div>
        <ChatRoom/>
        <UserList/>
      </div>
    )
  }
}

export default graphql(query)(Users);