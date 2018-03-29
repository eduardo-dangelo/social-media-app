const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PostType = require('./PostType');
const mongoose = require('mongoose');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args, req) {
        return req.posts;
      }
    },
  })
});

module.exports = RootQuery;