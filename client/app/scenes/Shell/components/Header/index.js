import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import mutation from '../../../../mutations/Logout';
import query from '../../../../queries/CurrentUser';
import logo from './img/graphql_logo_xxs.png'

class Header extends React.Component {
  onLogout() {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }

  renderButtons() {
    const { data } = this.props;

    if (data.loading) {
      return <div/>;
    }

    if (!data.user) {
      return (
        <div>
          <li>
            <Link to="/signup">
              SignUp
            </Link>
          </li>
          <li>
            <Link to="/login">
              Log in
            </Link>
          </li>
        </div>
      );
    }

    if (data.user) {
      return (
        <li>
          <a onClick={this.onLogout.bind(this)}>
            Logout
          </a>
        </li>
      );
    }
  }

  render() {
    if (window.scrollX) {
      console.log('eita')
    }

    return (
      <nav className="teal header">
        <div className="container">
          <div className="">
            <Link to="/" className=" left">
              <div className="page-title header-title">
                <img src={logo} alt=""/>
                <h5>Social Media App</h5>
              </div>
            </Link>
            <ul className="right">
              {this.renderButtons()}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(Header),
);