import React from 'react';
import { map } from 'lodash';
import FormControl from "../../../../../components/FormControl";
import { graphql, compose } from 'react-apollo'
import { addCommentToPost, detelePost } from '../../../../../../mutations/Post'
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

  showComments() {
    this.setState(prevState => ({
      showComments: !prevState.showComments,
    }))
  }

  render() {
    const { post, onUpdateRequired, userId } = this.props;
    const { showComments } = this.state;
    console.log('this.props.data', this.props)

    if (!post) {
      return null;
    }

    return (
      <div className="card animated fadeIn">
        <div className="card-content">
          <span className="cart-title">{post.user.firstName}  {post.user.lastName}</span>
          <h5>{post.content}</h5>
        </div>
        <div className="card-action">
          <a
            onClick={this.handleDelete.bind(this)}
            className="like-button"
          >
            delete
          </a>
          <a
            // onClick={() => this.handleLike(id, likes)}
            className="like-button"
          >
            <span>{post.likes.length}</span>
            {' '}
            <i className="material-icons">thumb_up</i>
          </a>
          <a className="comment-button" onClick={this.showComments.bind(this)}>
            {post.comments.length} comments
            <i className={`material-icons animated${showComments ? ' wobble' : ' pulse'}`}>{showComments ? 'chat' : 'chat_bubble'}</i>
          </a>
        </div>
        {showComments && (
          <div className="">
            <CommentList post={post}/>
            <div className="card-action">
              <CommentForm userId={userId} postId={post.id} onComment={onUpdateRequired}/>
            </div>
          </div>
        )}
      </div>
    )
  }

  handleDelete() {
    const { post, detelePost, onUpdateRequired } = this.props
    console.log('called')

    detelePost({
      variables: { id: post.id }
    }).then(
      console.log('a'),
      onUpdateRequired()
    )
  }
}

export default compose(
  graphql(addCommentToPost, { name: 'addCommentToPost' }),
  graphql(detelePost, { name: 'detelePost' }),
)(Post);