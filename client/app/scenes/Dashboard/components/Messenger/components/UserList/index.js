import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../../../queries/Users';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import UserListItem from './components/UserListItem';

class UserList extends React.Component {
  openMessenger(user) {
    const { onOpenMessenger } = this.props;

    onOpenMessenger(user);
  }

  render() {
    const { data } = this.props;
    const users = data.users;

    if (!users) {
      return (
        <div className="card">
          <div className="card-content">
            <ClipLoader
              color={'#000000'}
              size={18}
              loading={!users}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="collection with-header">
        <div className="collection-header teal white-text">
          <div className="cart-title">
            Users
          </div>
        </div>
        {map(data.users, (user, key) => {
          return <UserListItem onOpenMessenger={this.openMessenger.bind(this)} user={user} key={key}/>;
        })}
      </div>
    )
  }
}

export default graphql(query)(UserList);