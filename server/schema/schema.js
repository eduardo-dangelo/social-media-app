const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./types/rootQuerytype');
const mutation = require('./mutations/mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});
