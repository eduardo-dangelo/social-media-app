import React from 'react';
import './style.scss';

class UserListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moreInfo: false,
    }
  }

  toggleMoreInfo() {
    this.setState(prevState => ({
      moreInfo: !prevState.moreInfo,
    }));
  }

  openMessenger() {
    const { onOpenMessenger, user } = this.props;
    this.setState({
      moreInfo: false
    })

    onOpenMessenger(user);
  }

  render() {
    const { user } = this.props;
    const { moreInfo } = this.state;
    return (
      <div>
        <a onClick={this.toggleMoreInfo.bind(this)} className={`collection-item ${moreInfo && ''}`}>
          {user.firstName + ' ' + user.lastName}
        </a>
        {moreInfo && (
          <div
            // onClick={this.openMessenger.bind(this)}
            className="collection-item active"
          >
            {user.email}
            {/*<i className="material-icons">email</i>*/}
          </div>
        )}
      </div>
    )
  }
}

export default UserListItem;