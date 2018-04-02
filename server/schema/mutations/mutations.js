const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const PostType = require('../types/postType');
const CommentType = require('../types/commentType');
const UserType = require('../types/userType');
const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');
const AuthService = require('../../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // AUTH
    signup: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password, firstName, lastName }, req) {
        return AuthService.signup({ email, password, firstName, lastName, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    // POST
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parentValue, { title, content, userId }) {
        return (new Post({ title, content, userId })).save()
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
    // COMMENT
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
    },
  }
});

module.exports = mutation;