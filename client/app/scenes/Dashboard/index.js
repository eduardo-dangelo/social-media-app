import React from 'react';
import User from './components/User';
import Messenger from './components/Messenger';
import Posts from './components/Posts';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m5 l4">
          <User {...this.props}/>
          <Messenger/>
        </div>
        <div className="col s12 m7 l8">
          <Posts/>
        </div>
        {/*<div className="col s12 m4 l3">*/}
          {/*<Messenger/>*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default Dashboard