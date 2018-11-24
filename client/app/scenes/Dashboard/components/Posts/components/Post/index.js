import React from 'react';
import { map } from 'lodash';
import { graphql, compose } from 'react-apollo'
import { addCommentToPost, detelePost, likePost } from '../../../../../../mutations/Post'
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';

class Post extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      showComponent: true,
      comment: '',
      liked: false
    }
  }

  showComments() {
    this.setState(prevState => ({
      showComments: !prevState.showComments,
    }))
  }

  render() {
    const { post, onUpdateRequired, userId } = this.props;
    const { showComments, showComponent,liked } = this.state;

    if (!post) {
      return null;
    }

    return (
      <div className={`card animated ${showComponent ? 'fadeIn' : 'fadeOutUp'}`}>
        <div className="card-content">
          <span className="cart-title page-title">
            <i className={'material-icons'}>account_circle</i>
            {post.user.firstName}  {post.user.lastName}
            </span>
          <h5>{post.content}</h5>
        </div>
        <div className="card-action">
          {post.user.id === userId && (
            <a
              onClick={this.handleDelete.bind(this)}
              className="like-button"
            >
              delete
            </a>
          )}
          <a
            onClick={this.handleLike.bind(this)}
            className={'like-button'}
          >
            <span>{post.likes.length}</span>
            {' '}
            <i className={`material-icons animated${liked ? ' wobble' : ''}`}>thumb_up</i>
          </a>
          <a className="comment-button" onClick={this.showComments.bind(this)}>
            {post.comments.length} comments
            <i className={`material-icons animated${showComments ? ' wobble' : ' pulse'}`}>
              {showComments ? 'chat' : 'chat_bubble'}
            </i>
          </a>
        </div>
        {showComments && (
          <div className="">
            <CommentList userId={userId} post={post} onUpdateRequired={onUpdateRequired}/>
            <div className="card-action">
              <CommentForm userId={userId} postId={post.id} onComment={onUpdateRequired}/>
            </div>
          </div>
        )}
      </div>
    )
  }

  handleLike() {
    const { post, userId, likePost, onUpdateRequired } = this.props
    this.setState({ liked: true }),

    likePost({
      variables: { id: post.id, userId },
    }).then(
      setTimeout(() => (
        this.setState({ liked: false }),
        onUpdateRequired()
      ), 1000)
    )
  }

  handleDelete() {
    const { post, detelePost, onUpdateRequired } = this.props
    this.setState({ showComponent: false }),

    detelePost({
      variables: { id: post.id }
    }).then(
      setTimeout(() => (
        this.setState({ liked: false }),
          onUpdateRequired()
      ), 1000)
    )
  }
}

export default compose(
  graphql(addCommentToPost, { name: 'addCommentToPost' }),
  graphql(likePost, { name: 'likePost' }),
  graphql(detelePost, { name: 'detelePost' }),
)(Post);