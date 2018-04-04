import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './style.scss';

class Shell extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="shell">
        <Header/>
        {children}
        <Footer/>
      </div>
    )
  }
}

export default Shell;