import React from 'react';
import FormControl from "../../../../../../../components/FormControl/index";
import { graphql } from 'react-apollo';
import mutation from '../../../../../../../../mutations/AddCommentToPost';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      comment: '',
    }
  }

  handleSubmit(e) {
    const { postId, query } = this.props;
    e.preventDefault();

    this.props.mutate({
      variables: { id: postId, content: this.state.comment },
      refetchQueries: [{ query }],
    }).then(
      this.setState({ comment: '' }),
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormControl
          name="comment"
          placeholder="comment"
          type="text"
          value={this.state.comment}
          onChange={(e) => this.setState({ comment: e.target.value })}
        />
        <button
          type="submit"
          className="btn waves-effect waves-light"
        >
          send
        </button>
      </form>
    )
  }
}

export default graphql(mutation)(CommentForm);