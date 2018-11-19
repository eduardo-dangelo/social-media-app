import React from 'react';
import Header from './components/Header'
import './style.scss'

class Shell extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="shell" onScroll={console.log('scrolled')}>
        <Header/>
        <div className="container ">
          {children}
        </div>
      </div>
    )
  }
}

export default Shell;