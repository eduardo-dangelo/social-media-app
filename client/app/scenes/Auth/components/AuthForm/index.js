import React from 'react';

class AuthForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
            <input
              name="dob"
              type="text"
              placeholder="Date of birth"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
            />
            <input
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation"
            />
          </form>
        </div>
      )
  }
}

export default AuthForm;