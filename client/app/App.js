import React from 'react';
import Shell from './scenes/Shell';
import Auth from './scenes/Auth';

class App extends React.Component {
  render() {
    return (
      <div>
        <Shell>
          <Auth/>
        </Shell>
      </div>
    )
  }
}

export default App;