import React from 'react';
import { graphql } from 'react-apollo';

class Like extends React.Component {
  handleLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'PostType',
          likes: likes + 1
        }
      }
    })
  }
  render() {
    return (
      <div>
        <a
          onClick={() => this.handleLike(id, likes)}
          className="like-button"
        >
          <span>{post.likes}</span>
          {' '}
          <i className="material-icons">thumb_up</i>
        </a>
      </div>
    )
  }
}
console.log('this.props', this.props)

export default graphql(this.props.mutation)(Like);