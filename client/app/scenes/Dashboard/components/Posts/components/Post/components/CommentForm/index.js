import React from 'react';
import FormControl from "../../../../../../../components/FormControl/index";
import { compose, graphql } from 'react-apollo';
import { addCommentToPost } from '../../../../../../../../mutations/Post';
import currentUserQuery from '../../../../../../../../queries/CurrentUser';
import allPostsQuery from '../../../../../../../../queries/AllPosts';

class CommentForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      comment: '',
    }
  }

  handleSubmit(e) {
    const { postId, onComment, userId } = this.props;
    e.preventDefault();
    console.log('adding comment')


    this.props.addCommentToPost({
      variables: { id: postId, content: this.state.comment, userId },
    }).then(
      setTimeout(() => (
        this.setState({ comment: '' }),
        onComment()
      ), 1000)
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

export default compose(
  graphql(addCommentToPost, { name: 'addCommentToPost'}),
  graphql(currentUserQuery)
)(CommentForm)