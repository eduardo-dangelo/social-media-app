import React from 'react';
import Shell from './scenes/Shell';
import Auth from './scenes/Auth';
import Login from './scenes/Auth/components/Login';
import SignUp from './scenes/Auth/components/SignUp';
import Dashboard from './scenes/Dashboard';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Shell>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
          </Shell>
        </Router>
      </div>
    )
  }
}

export default App;