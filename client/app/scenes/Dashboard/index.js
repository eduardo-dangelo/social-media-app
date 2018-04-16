import React from 'react';
import User from './components/User';
import Posts from './components/Posts';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s3">
          <User/>
        </div>
        <div className="col s6">
          <Posts/>
        </div>
      </div>
    )
  }
}

export default Dashboard