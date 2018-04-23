import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/CurrentUser';
import EditUserInfo from './components/EditUserInfo';
import { ClipLoader } from 'react-spinners';
import './style.scss';

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
      return (
        <div className="card blue-grey darken-1">
          <div className="card-content">
            <ClipLoader
              color={'#ffffff'}
              size={18}
              loading={!user}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="card blue-grey darken-1 animated fadeInUp">
          {/*<div className="card-image">*/}
            {/*<img src={require('./img/user-img.jpg')}/>*/}
            {/*<a className="btn-floating halfway-fab waves-effect waves-light blue-grey">*/}
              {/*<i className="tiny material-icons">add_a_photo</i>*/}
            {/*</a>*/}
          {/*</div>*/}
          <div className="card-content white-text">
            {!editInfo ? (
              <div className="">
                <p>{user.email}</p>
              </div>
            ) : (
              <div className="animated fadeIn">
                <EditUserInfo/>
              </div>
            )}
          </div>
          <div className="card-action">
            <a className={'edit-profile-btn'} onClick={this.toggleEditInfo.bind(this)}>
              <i className="material-icons">{!editInfo ? 'settings' : 'subdirectory_arrow_left'}</i>
              {!editInfo ? ' Edit Profile' : ' Back'}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(query)(User);