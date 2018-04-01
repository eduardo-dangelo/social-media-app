const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');
const Comment = mongoose.model('comment');
const CommentType = require('./commentType');
const Post = mongoose.model('post');
const PostType = require('./postType');
const UserType = require('./userType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Post.findById(id);
      }
    },
    lyric: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id);
      }
    }
  }
});

module.exports = RootQueryType;