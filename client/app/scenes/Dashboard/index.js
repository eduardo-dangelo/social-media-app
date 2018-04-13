import React from 'react';
import User from './components/User';

class Dashborad extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s2">
          <User/>
        </div>
      </div>
    )
  }
}

export default Dashborad