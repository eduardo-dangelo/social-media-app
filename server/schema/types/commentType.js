const mongoose = require('mongoose');
const graphql = require('graphql');
const User = mongoose.model('user');
const Comment = mongoose.model('comment');
const LikeType = require('./likeType');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql;


const CommentType = new GraphQLObjectType({
  name:  'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    // likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    user: {
      type: require('./userType'),
      resolve(parentValue, args, req) {
        return User.loadUser(parentValue.user)
      }
    },
    likes: {
      type: new GraphQLList(LikeType),
      resolve(parentValue) {
        return Comment.findLikes(parentValue.id)
      }
    },
  })
});

module.exports = CommentType;
