import React from 'react';
import Shell from './scenes/Shell';
import Auth from './scenes/Auth';
import Login from './scenes/Auth/Login';
import SignUp from './scenes/Auth/SignUp';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Shell>
          <Router>
            <div>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={SignUp} />
              {/*<Auth/>*/}
            </div>
          </Router>
          {/*<Login/s>*/}
          {/*<SignUp/>*/}
        </Shell>
      </div>
    )
  }
}

export default App;