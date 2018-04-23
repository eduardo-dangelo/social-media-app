import React from 'react';
import { graphql } from 'react-apollo';
import query from '../../../../queries/AllPosts';
import { map } from 'lodash';
import './style.scss';;
import Post from './components/Post';
import { ClipLoader } from 'react-spinners';

class Posts extends React.Component {
  render() {
    const { data } = this.props;

    if (!data.posts) {
      return (
        <div className="card blue-grey darken-1">
          <div className="card-content">
            <ClipLoader
              color={'#ffffff'}
              size={18}
              loading={!data.posts}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        {map(data.posts, (post, key) => {
          return (
            <Post key={key} query={query} post={post} {...this.props}/>
          );
        })}
      </div>
    )
  }
}

export default graphql(query)(Posts);