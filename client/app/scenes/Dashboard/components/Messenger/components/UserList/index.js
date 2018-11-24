import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../../../queries/Users';
import { map } from 'lodash';
import { ClipLoader } from 'react-spinners';
import UserListItem from './components/UserListItem';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
    }
  }
  openMessenger(user) {
    const { onOpenMessenger } = this.props;

    onOpenMessenger(user);
  }

  toggleList() {
    console.log('cale')
    this.setState({ showList: !this.state.showList })
  }

  render() {
    const { data } = this.props;
    const { showList } = this.state;
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
        <div className={`collection-header ${showList ? 'teal white-text' : ''}`}>
          <div className="cart-title" onClick={this.toggleList.bind(this)}>
            Users
          </div>
        </div>
        {showList && map(data.users, (user, key) => {
          return <UserListItem onOpenMessenger={this.openMessenger.bind(this)} user={user} key={key}/>;
        })}
      </div>
    )
  }
}

export default graphql(query)(UserList);