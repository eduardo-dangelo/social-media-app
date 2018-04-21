import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/Users';
import { map } from 'lodash';
import { Link } from 'react-router-dom';

class Users extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div className="collection z-depth-2">
        {map(data.users, (user, key) => {
          return (
            <Link to="#" className="collection-item " key={key}>
              {user.email}
            </Link>
          );
        })}
      </div>
    )
  }
}

export default graphql(query)(Users);