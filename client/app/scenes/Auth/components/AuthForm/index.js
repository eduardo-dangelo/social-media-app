import React from 'react';
import FormControl from '../../../components/FormControl';
import { Link } from 'react-router-dom';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  handleSubmit(event) {
    const { firstName, lastName, email, password } = this.state;
    event.preventDefault();

    this.props.onSubmit({
      firstName,
      lastName,
      email,
      password,
    });
  }

  render() {
    const { authType } = this.props;
    const signUp = authType === 'signUp';
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
        </form>
      </div>
    )
  }
}

export default AuthForm;