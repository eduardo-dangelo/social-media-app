import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/CurrentUser';
import EditUserInfo from './components/EditUserInfo';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editInfo: false,
    }
  }

  componentWillMount() {
    const { data, history } = this.props

    if (!data.user) {
      history.push('/login');
    }
  }

  componentWillUpdate(nextProps) {
    const { history } = this.props;

    if (!nextProps.data.user) {
      history.push('/login');
    }
  }

  toggleEditInfo() {
    this.setState((prevState) => ({
      editInfo: !prevState.editInfo,
    }))
  }

  render() {
    // console.log('this.props', this.props)
    const { data } = this.props;
    const { editInfo } = this.state;
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
            {!editInfo ? (
              <div>
                <span className="card-title">
                  {user.firstName} {user.lastName}
                </span>
                <p>{user.email}</p>
              </div>
            ) : (
              <div>
                <EditUserInfo/>
              </div>
            )}
          </div>
          <div className="card-action">
            <a onClick={this.toggleEditInfo.bind(this)}>
              {!editInfo ? 'Edit info' : 'Back'}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(query)(User);