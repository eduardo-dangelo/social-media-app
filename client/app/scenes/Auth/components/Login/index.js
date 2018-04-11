import React from 'react';
// import './style.scss';
import AuthForm from '../AuthForm/index';
import mutation from '../../../../mutations/Login';
import query from '../../../../queries/CurrentUser';
import { graphql } from 'react-apollo';
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    const { history } = this.props;
    if (nextProps.data.user) {
      history.push('/dashboard')
    }
  }

  handleSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }],
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message );
      this.setState({ errors });
    })
  }

  render() {
    console.log('this.props', this.props);
    return (
      <div className="auth-container container">
        <div className="auth-box animate bounceInDown">
          <AuthForm authType="login" onSubmit={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(Login)
);