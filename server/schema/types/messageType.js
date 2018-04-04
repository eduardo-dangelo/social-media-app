const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  // GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Message = mongoose.model('message');
const User = mongoose.model('user');
const UserType = require('./userType');

const MessageType = new GraphQLObjectType({
  name:  'MessageType',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    chat: {
      type: require('./chatType'),
      resolve(parentValue) {
        return Message.findById(parentValue).populate('chat')
          .then(message => {
            return message.chat
          });
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return User.loadUser(parentValue.userId)
      }
    },
  })
});

module.exports = MessageType;
