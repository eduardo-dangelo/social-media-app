import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../../../queries/Users';
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import UserListItem from './components/UserListItem';

class UserList extends React.Component {
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
      <div className="collection z-depth-2">
        <Link to="#" className="collection-header"><h6>Users</h6></Link>
        {map(data.users, (user, key) => {
          return <UserListItem user={user} key={key}/>;
        })}
      </div>
    )
  }
}

export default graphql(query)(UserList);