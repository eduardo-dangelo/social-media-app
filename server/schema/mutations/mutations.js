const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const PostType = require('../types/postType');
const mongoose = require('mongoose');
const Post = mongoose.model('post');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        message: { type: GraphQLString }
      },
      resolve(parentValue, { title, message }) {
        return (new Post({ title, message })).save()
      }
    },
    addCommentToPost: {
      type: PostType,
      args: {
        content: { type: GraphQLString },
        postId: { type: GraphQLID }
      },
      resolve(parentValue, { content, postId }) {
        return Post.addComment(postId, content);
      }
    },
  }
});

module.exports = mutation;