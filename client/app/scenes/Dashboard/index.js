import React from 'react';
import User from './components/User';
import Messenger from './components/Messenger';
import Posts from './components/Posts';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s3">
          <User {...this.props}/>
        </div>
        <div className="col s6">
          <Posts/>
        </div>
        <div className="col s3">
          <Messenger/>
        </div>
      </div>
    )
  }
}

export default Dashboard