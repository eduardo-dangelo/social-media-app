import React from 'react';
import Header from './components/Header';
// import Footer from './components/Footer';
import './style.scss';

class Shell extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="shell">
        <Header/>
        <div className="container">
          {children}
        </div>
        {/*<Footer/>*/}
        {/*<img src={require('./img/pc.jpg')} alt=""/>*/}
      </div>
    )
  }
}

export default Shell;