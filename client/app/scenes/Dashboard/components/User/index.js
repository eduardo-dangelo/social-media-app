import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/CurrentUser'

class User extends React.Component {
  render() {
    console.log('this.props', this.props)
    const { data } = this.props;
    const user = data.user;

    if (!user) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div className="card blue-grey darken-1">
          <div className="card-image">
            <img src={require('./img/user-img.jpg')}/>
          </div>
          <div className="card-content white-text">
            <span className="card-title">
              {user.firstName} {user.lastName}
            </span>
            <p>{user.email}</p>
          </div>
        <div className="card-action">
          <a>
            edit info
          </a>
        </div>
        </div>
      </div>
    )
  }
}

export default graphql(query)(User);