const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model('user');
const Post = mongoose.model('post');
const postType = require('./postType');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () =>  ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    // posts: {
    //   type: new GraphQLList(postType),
    //   resolve(parentValue) {
    //     return User.findPosts(parentValue);
    //   }
    // }
  })
});

module.exports = UserType;