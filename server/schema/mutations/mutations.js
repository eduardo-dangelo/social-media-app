const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const PostType = require('../types/postType');
const CommentType = require('../types/commentType');
const UserType = require('../types/userType');
const ChatType = require('../types/chatType');
const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Comment = mongoose.model('comment');
const Chat = mongoose.model('chat');
const User = mongoose.model('user');
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

    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return User.update(args);
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

    // CHAT

    newChat: {
      type: ChatType,
      args: { userId: { type: GraphQLID } },
      resolve(parentValue, { userId }) {
        return (new Chat({ userId })).save()
      }
    },

    addUserToChat: {
      type: ChatType,
      args: {
        chatId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { chatId, userId }) {
        return Chat.addUser(chatId, userId);
      }
    },

    sendMessage: {
      type: ChatType,
      args: {
        content: { type: GraphQLString },
        chatId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parentValue, { content, chatId, userId }) {
        return Chat.sendMessage(chatId, userId, content);
      }
    },

    deleteMessage: {
      type: ChatType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Chat.remove({ _id: id })
      }
    },
  }
});

module.exports = mutation;