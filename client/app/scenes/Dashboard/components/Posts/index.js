import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/AllPosts';
import { map } from 'lodash';
import './style.scss';

class Posts extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.posts;

    if (!data.posts) {
      return null;
    }

    console.log('this.props', this.props)
    return (
      <div>
        {map(data.posts, (post, key) => {
          return (
            <div key={key} className="card blue-grey darken-1">
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
                <a className="comment-button" href="#">
                  comments
                  <i className="material-icons">chat</i>
                </a>
              </div>
              <div className="card-content white-text blue-grey darken-2">
                comments
              </div>
              <div className="card-action">
                <button className="btn waves-effect waves-light">
                  send
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}

export default graphql(query)(Posts);