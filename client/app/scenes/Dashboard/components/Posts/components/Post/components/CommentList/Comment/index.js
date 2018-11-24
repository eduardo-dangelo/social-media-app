import React from 'react';
import { map } from 'lodash';
import { compose, graphql } from 'react-apollo';
import { likeComment, deteleComment } from '../../../../../../../../../mutations/Post';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      showComponent: true
    }
  }


  render() {
    const { comment } = this.props;
    const { showComponent, liked } = this.state;

    return (
      <div className={`card animated ${showComponent ? 'fadeIn' : 'fadeOutUp'}`}>
        <div className="card-content page-title">
          <i className={'material-icons'}>account_circle</i>
          <strong>{comment.user.firstName} {comment.user.lastName}</strong>
          {comment.content}
        </div>
        <div className="card-action">
          <a
            onClick={this.handleDelete.bind(this)}
            className="like-button"
          >
            delete
          </a>
          <a
            onClick={this.handleLike.bind(this)}
            className="like-button"
          >
            <span>{comment.likes.length}</span>
            {' '}
            <i className={`material-icons animated${liked ? ' wobble' : ''}`}>thumb_up</i>
          </a>
        </div>
      </div>
    )
  }

  handleLike() {
    const { comment, userId, likeComment, onUpdateRequired } = this.props
    this.setState({ liked: true }),

    likeComment({
      variables: { id: comment.id, userId },
    }).then(
      setTimeout(() => (
        this.setState({ liked: false }),
        onUpdateRequired()
      ), 800)
    )
  }

  handleDelete() {
    const { comment, deteleComment, onUpdateRequired } = this.props
    this.setState({ showComponent: false }),

    deteleComment({
      variables: { id: comment.id }
    }).then(
      setTimeout(() => (
        onUpdateRequired()
      ), 800)
    )
  }
}

export default compose(
  graphql(deteleComment, { name: 'deteleComment'}),
  graphql(likeComment, { name: 'likeComment'}),
)(Comment);