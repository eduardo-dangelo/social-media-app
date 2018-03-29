const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    message: { type: GraphQLString }
  }
});

module.exports = PostType;