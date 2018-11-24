import React from 'react';
import { map } from 'lodash';
import Comment from './Comment';

class CommentList extends React.Component {

  render() {
    const { post, userId, onUpdateRequired } = this.props;

    return (
      <div>
        {post.comments.length > 0 && (
          <div className="card-content comments-container darken-1">
            <div className="row">
              {map(post.comments, (comment) => {
                return (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    userId={userId}
                    onUpdateRequired={onUpdateRequired}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default CommentList;