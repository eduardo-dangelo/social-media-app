import React from 'react';
// import './style.scss';
import AuthForm from '../AuthForm/index';
import query from "../../../../queries/CurrentUser";
import mutation from '../../../../mutations/SignUp';
import { graphql } from 'react-apollo';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      isSubmitting: false,
      userAuth: false
    };
  }

  componentWillUpdate(nextProps) {
    const { history } = this.props;
    if (nextProps.data.user) {
      history.push('/dashboard');
      this.setState({ isSubmitting: false });
    }
  }


  handleSubmit({ firstName, lastName, email, password }) {
    this.setState({ isSubmitting: true });
    this.props.mutate({
      variables: { firstName, lastName, email, password },
      refetchQueries: [{ query }],
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message );
      this.setState({ errors });
      this.setState({ isSubmitting: false });
    })
  }

  render() {
    return (
      <div className="page-content">
        <AuthForm
          authType="signUp"
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
  graphql(query)(SignUp),
);