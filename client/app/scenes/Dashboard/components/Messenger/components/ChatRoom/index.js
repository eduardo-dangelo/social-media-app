import React from 'react';

class ChatRoom extends React.Component {
  openUserList() {
    const { onOpenUserList } = this.props;

    onOpenUserList();
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="card-title">
            Messenger
          </div>
        </div>
        <div className="card-content blue-grey darken-2">
          <div className="row">
            <div className="col s12 m10 left">
              <div className="card">
                <div className="card-content">
                  cole brother!!
                </div>
              </div>
            </div>
            <div className="col s12 m10 right">
              <div className="card">
                <div className="card-content">
                  fala tu joe!
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-action">
          <a onClick={this.openUserList.bind(this)}>Back</a>
        </div>
      </div>
    )
  }
}

export default ChatRoom;