import React from 'react';
import './style.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <div className="page-title">
            <h2>Social Media App</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Header