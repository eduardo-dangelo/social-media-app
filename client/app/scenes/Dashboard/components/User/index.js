import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/CurrentUser';
import mutation from '../../../../mutations/UpdateUser';
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
  
  handleSubmit(values) {
    this.props.mutate({
      variables: { id: values.id, firstName: values.firstName, lastName: values.lastName, dob: values.dob},
      refetchQueries: [{ query }],
    }).then(
      this.setState({
        editInfo: false,
      })
    )
  }

  render() {
    // console.log('this.props', this.props)
    const { data } = this.props;
    const { editInfo } = this.state;
    const user = data.user;

    if (!user) {
      return (
        <div className="card">
          <div className="card-content">
            <ClipLoader
              color={'#000000'}
              size={18}
              loading={!user}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="card animated fadeIn">
          {/*<div className="card-image">*/}
            {/*<img src={require('./img/user-img.jpg')}/>*/}
            {/*<a className="btn-floating halfway-fab waves-effect waves-light blue-grey">*/}
              {/*<i className="tiny material-icons">add_a_photo</i>*/}
            {/*</a>*/}
          {/*</div>*/}
          <div className="card-content">
            {!editInfo ? (
              <div className="">
                <div className="card-title">Welcome {user.firstName}</div>
                <p>{user.email}</p>
              </div>
            ) : (
              <div className="animated fadeIn">
                <EditUserInfo user={user} onSubmit={this.handleSubmit.bind(this)}/>
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

export default graphql(query)(
  graphql(mutation)(User),
);