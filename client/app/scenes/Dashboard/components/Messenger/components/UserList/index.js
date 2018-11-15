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
        <div className="card blue-grey darken-1">
          <div className="card-content">
            <ClipLoader
              color={'#ffffff'}
              size={18}
              loading={!users}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="collection with-header z-depth-2">
        <div className="collection-header blue-grey darken-1 white-text">
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