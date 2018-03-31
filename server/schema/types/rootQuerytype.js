const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PostType = require('./postType');
const mongoose = require('mongoose');
const Post = mongoose.model('post');


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      }
    },
  }
});

module.exports = RootQueryType;