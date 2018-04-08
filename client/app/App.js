import React from 'react';
import Shell from './scenes/Shell';
import Auth from './scenes/Auth';
import Login from './scenes/Auth/Login';
import SignUp from './scenes/Auth/SignUp';

class App extends React.Component {
  render() {
    return (
      <div>
        <Shell>
          <Auth/>
          <Login/>
          <SignUp/>
        </Shell>
      </div>
    )
  }
}

export default App;