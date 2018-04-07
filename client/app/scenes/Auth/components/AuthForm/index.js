import React from 'react';
import FormControl from '../../../components/FormControl';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      authType: 'login',
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { authType } = this.state;
    const signUp = authType === 'signUp';
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <h4>{signUp ? 'Sign Up' : 'Log In'}</h4>
          {signUp && (
            <div>
              <FormControl
                name="firstName"
                type="text"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
              <FormControl
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </div>
          )}
          <FormControl
            name="email"
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <FormControl
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          {signUp && (
            <FormControl
              name="passwordConfirmation"
              type="password"
              placeholder="Password Confirmation"
              value={this.state.passwordConfirmation}
              onChange={(e) => this.setState({ passwordConfirmation: e.target.value })}
            />
          )}
          <button className="btn waves-effect waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
          {!signUp && (
            <div onClick={() => this.setState({ authType: 'signUp'})}>Sign Up</div>
          )}
          {signUp && (
            <div onClick={() => this.setState({ authType: 'login'})}>Log In</div>
          )}
        </form>
      </div>
    )
  }
}

export default AuthForm;