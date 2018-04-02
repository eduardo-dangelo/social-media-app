const graphql = require('graphql');
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model('user');
const PostType = require('./postType');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    // posts: {
    //   type: new GraphQLList(PostType),
    //   resolve(parentValue) {
    //     return User.findPosts(parentValue.id)
    //   }
    // }
  }
});

module.exports = UserType;