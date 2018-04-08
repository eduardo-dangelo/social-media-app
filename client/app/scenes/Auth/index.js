import React from 'react';
import './style.scss';
// import LogIn from './components/LogIn';
// import SignUp from './components/SignUp';
import AuthForm from './components/AuthForm';

class Auth extends React.Component {
  handleSubmit(formValues) {
    console.log('formValues', formValues)
  }

  render() {
    return (
      <div className="auth-container container">
        <div className="auth-box animate bounceInDown">
          <AuthForm authType="signUp" onSubmit={this.handleSubmit()}/>
          auth
        </div>
      </div>
    )
  }
}

export default Auth