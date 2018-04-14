import React from 'react';
import User from './components/User';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s3">
          <User/>
        </div>
      </div>
    )
  }
}

export default Dashboard