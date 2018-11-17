const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const User = mongoose.model('user');


const CommentType = new GraphQLObjectType({
  name:  'LikeType',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: require('./userType'),
      resolve(parentValue, args, req) {
        return User.loadUser(parentValue.user)
      }
    },
  })
});

module.exports = CommentType;
