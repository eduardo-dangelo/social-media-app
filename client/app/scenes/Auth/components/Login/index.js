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

    this.state = {
      errors: [],
      isSubmitting: false,
    };
  }

  componentWillUpdate(nextProps) {
    const { history } = this.props;
    if (nextProps.data.user) {
      history.push('/dashboard')
      this.setState({ isSubmitting: false });
    }
  }

  handleSubmit({ email, password }) {
    this.setState({ isSubmitting: true });
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }],
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message );
      this.setState({ errors });
      this.setState({ isSubmitting: false });
    })
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <AuthForm
          authType="login"
          errors={this.state.errors}
          onSubmit={this.handleSubmit.bind(this)}
          isSubmitting={this.state.isSubmitting}
          userAuth={this.state.userAuth}
          {...this.props}
        />
      </div>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Login)
);