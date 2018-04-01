const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID, GraphQLList } = graphql;
const CommentType = require('./commentType');
const Post = mongoose.model('post');

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    message: { type: GraphQLString },
    likes: { type: GraphQLInt },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Post.findComments(parentValue.id)
      }
    }
  }
});

module.exports = PostType;