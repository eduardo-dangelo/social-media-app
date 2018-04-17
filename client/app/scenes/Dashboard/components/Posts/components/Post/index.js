import React from 'react';
import { map } from 'lodash';
import FormControl from "../../../../../components/FormControl";
import { graphql } from 'react-apollo'
import mutation from '../../../../../../mutations/AddCommentToPost'

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      comment: '',
    }
  }

  handleSubmit(e) {
    const { post, query } = this.props;
    e.preventDefault();

    this.props.mutate({
      variables: { id: post.id, content: this.state.comment },
      refetchQueries: [{ query }],
    })
  }

  showComments() {
    this.setState(prevState => ({
      showComments: !prevState.showComments,
    }))
  }

  render() {
    const { post } = this.props;
    const { showComments } = this.state;

    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="cart-title">{post.title}</span>
          <p>{post.content}</p>
        </div>
        <div className="card-action">
          <a
            // onClick={() => this.handleLike(id, likes)}
            className="like-button"
          >
            <span>{post.likes}</span>
            {' '}
            <i className="material-icons">thumb_up</i>
          </a>
          <a className="comment-button" onClick={this.showComments.bind(this)}>
            {post.comments.length} comments
            <i className="material-icons">chat</i>
          </a>
        </div>
        {showComments && (
          <div>
            {post.comments.length > 0 && (
              <div className="card-content white-text blue-grey darken-2">
                <div className="row">
                  {map(post.comments, (comment, key) => {
                    return (
                      <div className="col sm12 m10 right card-panel blue-grey darken-1">
                        <div className="card-content">
                          {comment.content}
                        </div>
                        <div className="card-action">
                          <a
                            // onClick={() => this.handleLike(id, likes)}
                            className="like-button"
                          >
                            <span>{post.likes}</span>
                            {' '}
                            <i className="material-icons">thumb_up</i>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="card-action">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <FormControl
                  name="comment"
                  placeholder="comment"
                  type="text"
                  value={this.state.comment}
                  onChange={(e) => this.setState({ comment: e.target.value })}
                />
                <button className="btn waves-effect waves-light">
                  send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default graphql(mutation)(Post);