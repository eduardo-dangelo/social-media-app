const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const PostType = require('../types/postType');
const CommentType = require('../types/commentType');
const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');

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
    likePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.like(id);
      }
    },
    likeComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.like(id);
      }
    },
  }
});

module.exports = mutation;