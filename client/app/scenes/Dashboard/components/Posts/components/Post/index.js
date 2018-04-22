import React from 'react';
import { map } from 'lodash';
import FormControl from "../../../../../components/FormControl";
import { graphql } from 'react-apollo'
import mutation from '../../../../../../mutations/AddCommentToPost'
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';

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
    }).then(
      this.setState({ comment: '' }),
    );
  }

  showComments() {
    this.setState(prevState => ({
      showComments: !prevState.showComments,
    }))
  }

  render() {
    const { post } = this.props;
    const { showComments } = this.state;
    console.log('this.props.data', this.props.data)

    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="cart-title">{post.title}</span>
          <p>{post.content}</p>
        </div>
        <div className="card-action">
          {/*<a
            // onClick={() => this.handleLike(id, likes)}
            className="like-button"
          >
            <span>{post.likes}</span>
            {' '}
            <i className="material-icons">thumb_up</i>
          </a>*/}
          <a className="comment-button" onClick={this.showComments.bind(this)}>
            {post.comments.length} comments
            <i className={`material-icons animated${showComments ? ' wobble' : ' pulse'}`}>{showComments ? 'chat' : 'chat_bubble'}</i>
          </a>
        </div>
        {showComments && (
          <div className="">
            <CommentList post={post}/>
            <div className="card-action white-text">
              <CommentForm postId={post.id}/>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default graphql(mutation)(Post);