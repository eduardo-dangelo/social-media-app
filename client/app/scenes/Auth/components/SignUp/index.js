import React from 'react';
// import './style.scss';
import AuthForm from '../AuthForm/index';
import query from "../../../../queries/CurrentUser";
import mutation from '../../../../mutations/SignUp';
import { graphql } from 'react-apollo';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data.user) {
      history.push('/dashboard');
    }
  }

  handleSubmit({ firstName, lastName, email, password }) {
    this.props.mutate({
      variables: { firstName, lastName, email, password },
      refetchQueries: [{ query }],
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message );
      this.setState({ errors });
    })
  }

  render() {
    return (
      <div>
        <AuthForm
          authType="signUp"
          errors={this.state.errors}
          onSubmit={this.handleSubmit.bind(this)}
          {...this.props}
        />
      </div>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(SignUp),
);