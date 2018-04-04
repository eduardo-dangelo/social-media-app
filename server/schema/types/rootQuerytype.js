const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');
const Comment = mongoose.model('comment');
const CommentType = require('./commentType');
const Post = mongoose.model('post');
const User = mongoose.model('user');
const Chat = mongoose.model('chat');
const Message = mongoose.model('message');
const PostType = require('./postType');
const UserType = require('./userType');
const ChatType = require('./chatType');
const MessageType = require('./messageType');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
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
    comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id);
      }
    },
    chats: {
      type: new GraphQLList(ChatType),
      resolve() {
        return Chat.find({});
      }
    },
    chat: {
      type: ChatType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Chat.findById(id);
      }
    },
    message: {
      type: MessageType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Message.findById(id);
      }
    }
  }
});

module.exports = RootQueryType;