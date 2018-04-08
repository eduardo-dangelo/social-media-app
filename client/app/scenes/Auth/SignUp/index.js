import React from 'react';
// import './style.scss';
import AuthForm from '../components/AuthForm';

class SignUp extends React.Component {
  handleSubmit(formValues) {
    console.log('formValues', formValues)
  }

  render() {
    return (
      <div className="auth-container container">
        <div className="auth-box animate bounceInDown">
          <AuthForm authType="signUp" onSubmit={this.handleSubmit()}/>
        </div>
      </div>
    )
  }
}

export default SignUp;