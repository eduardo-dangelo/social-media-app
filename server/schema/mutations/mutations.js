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
    likePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.like(id);
      }
    },
    unlikePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.unlike(id);
      }
    },
    deletePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Post.remove({ _id: id })
      }
    },
    addCommentToPost: {
      type: PostType,
      args: {
        content: { type: GraphQLString },
        id: { type: GraphQLID }
      },
      resolve(parentValue, { content, id }) {
        return Post.addComment(id, content);
      }
    },
    likeComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.like(id);
      }
    },
    unlikeComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.unlike(id);
      }
    },
    deleteComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Comment.remove({ _id: id })
      }
    }
  }
});

module.exports = mutation;