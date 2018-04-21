import React from 'react';
import { map } from 'lodash';
import { graphql } from 'react-apollo';
import mutation from '../../../../../../../../mutations/LikeComment';

class CommentList extends React.Component {
  handleLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeComment: {
          id,
          __typename: 'PostType',
          likes: likes + 1
        }
      }
    })
  }

  render() {
    const { post } = this.props;

    return (
      <div>
        {post.comments.length > 0 && (
          <div className="card-content comments-container white-text blue-grey darken-2">
            <div className="row">
              {map(post.comments, (comment, key) => {
                return (
                  <div key={key} className="col sm12 m10 right card-panel blue-grey darken-1 animated fadeIn">
                    <div className="card-content">
                      {comment.content}
                    </div>
                    <div className="card-action">
                      <a
                        onClick={() => this.handleLike(comment.id, comment.likes)}
                        className="like-button"
                      >
                        <span>{comment.likes}</span>
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
      </div>
    )
  }
}

export default graphql(mutation)(CommentList);