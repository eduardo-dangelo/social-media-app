import React from 'react';
import './style.scss';
import { map } from 'lodash';
import Post from './components/Post';
import { compose, graphql } from 'react-apollo';
import { ClipLoader } from 'react-spinners';
import PostForm from './components/PostForm';
import { allPosts, currentUser } from '../../../../queries';

class Posts extends React.PureComponent {
  renderPosts(userId) {
    const { allPosts } = this.props;

    if (!allPosts.posts) {
      return (
        <div className="card">
          <div className="card-content">
            <ClipLoader
              size={18}
              color={'#000000'}
              loading={!allPosts.posts}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        {map(allPosts.posts.reverse(), (post, key) => {
          return (
            <Post
              key={post.id}
              post={post}
              userId={userId}
              query={allPosts}
              onUpdateRequired={this.refetchPosts.bind(this)}
              {...this.props}
            />
          );
        })}
      </div>
    )
  }

  render() {
    const { currentUser } = this.props
    const userId = currentUser.user && currentUser.user.id
    return (
      <div>
        <PostForm userId={userId} onCreatePost={this.refetchPosts.bind(this)}/>
        {this.renderPosts(userId)}
      </div>
    )
  }

  refetchPosts() {
    const { allPosts } = this.props
    allPosts.refetch()
  }
}

export default compose(
  graphql(currentUser, { name: 'currentUser'}),
  graphql(allPosts, { name: 'allPosts'})
)(Posts);