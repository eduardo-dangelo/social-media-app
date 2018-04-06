import React from 'react';
import './style.scss';
import AuthForm from './components/AuthForm';

class Auth extends React.Component {
  handleSubmit(formValues) {
    console.log('formValues', formValues)
  }

  render() {
    return (
      <div className="auth-container container">
        <div className="auth-box animate bounceInDown">
          <button className="btn waves-effect waves-light" type="button" name="action">
            Login
            {/*<i className="mateiial-icons right">send</i>*/}
          </button>
          <button className="btn waves-effect waves-light" type="button" name="action">
            Sign Up
            {/*<i className="material-icons right">send</i>*/}
          </button>
          <AuthForm onSubmit={this.handleSubmit()}/>
        </div>
      </div>
    )
  }
}

export default Auth