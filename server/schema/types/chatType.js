const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const MessageType = require('./commentType');
const UserType = require('./userType');
const Chat = mongoose.model('chat');
const User = mongoose.model('user');

const ChatType = new GraphQLObjectType({
  name: 'ChatType',
  fields: () => ({
    id: { type: GraphQLID },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args, req) {
        console.log('parentValue', parentValue)
        console.log('args', args)
        return Chat.findUsers(parentValue.userId)
      }
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parentValue) {
        return Chat.findMessages(parentValue.id)
      }
    }
  })
});

module.exports = ChatType;