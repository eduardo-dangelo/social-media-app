import React from 'react';
import FormControl from "../../../../../components/FormControl/index";
import { graphql, compose } from 'react-apollo';
import { addPost } from '../../../../../../mutations/Post';
import { currentUser } from '../../../../../../queries';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      content: '',
    }
  }

  handleSubmit(e) {
    const { postId, addPost, userId, onCreatePost } = this.props;
    e.preventDefault();

    addPost({
      variables: { id: postId, content: this.state.content, userId },
    }).then(
      this.setState({ content: '' }),
      onCreatePost()
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="card">
          <div className="card-content">
            <FormControl
              name="content"
              placeholder="Your post here..."
              type="text"
              value={this.state.content}
              onChange={(e) => this.setState({ content: e.target.value })}
            />
          </div>
          <div className="card-action">
            <button
              type="submit"
              className="btn waves-effect waves-light"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default compose(
  graphql(addPost, { name: 'addPost'}),
)(PostForm);