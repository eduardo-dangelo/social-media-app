import React from 'react';
import {map} from "lodash";
import FormControl from "../../../../../components/FormControl";

class Comments extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <div>
        {post.comments.length > 0 && (
          <div className="card-content white-text blue-grey darken-2">
            <div className="row">
              {map(post.comments, (comment, key) => {
                return (
                  <div className="col sm12 m10 right card-panel blue-grey darken-1">
                    <div className="card-content">
                      {comment.content}
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="card-action">
          <FormControl
            name="comment"
            placeholder="comment"
            type="text"
            value={}
          />
          <button className="btn waves-effect waves-light">
            send
          </button>
        </div>
      </div>
    )
  }
}

export default Comments