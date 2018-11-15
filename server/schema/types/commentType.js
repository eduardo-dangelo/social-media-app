const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  // GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
// const Comment = mongoose.model('comment');
const User = mongoose.model('user');
// const UserType = require('./userType');


const CommentType = new GraphQLObjectType({
  name:  'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    user: {
      type: require('./userType'),
      resolve(parentValue, args, req) {
        console.log('parentValue', parentValue)
        console.log('args', args)
        return User.loadUser(parentValue.user)
      }
    },
  })
});

module.exports = CommentType;
