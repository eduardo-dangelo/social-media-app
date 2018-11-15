import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/Users';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import UserList from './components/UserList';
import ChatRoom from './components/ChatRoom';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChatOpen: false,
    }
  }

  openMessenger() {
    this.setState({
      isChatOpen: true,
    })
  }

  openUserList() {
    this.setState({
      isChatOpen: false,
    })
  }

  render() {
    const { isChatOpen } = this.state;
    return (
      <div>
        {isChatOpen ? (
          <ChatRoom
            onOpenUserList={this.openUserList.bind(this)}
          />
        ) : (
          <UserList onOpenMessenger={this.openMessenger.bind(this)}/>
        )}
      </div>
    )
  }
}

export default graphql(query)(Users);