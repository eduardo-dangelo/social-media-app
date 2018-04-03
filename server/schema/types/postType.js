const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const CommentType = require('./commentType');
const UserType = require('./userType');
const Post = mongoose.model('post');
const User = mongoose.model('user');

const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    likes: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        console.log('parentValue', parentValue)
        return User.loadUser(parentValue.userId)
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Post.findComments(parentValue.id)
      }
    }
  })
});

module.exports = PostType;

// const mongoose = require('mongoose');
// const graphql = require('graphql');
// const {
//   GraphQLObjectType,
//   // GraphQLList,
//   GraphQLID,
//   GraphQLInt,
//   GraphQLString
// } = graphql;
// const Comment = mongoose.model('comment');
//
// const PostType = new GraphQLObjectType({
//   name:  'PostType',
//   fields: () => ({
//     id: { type: GraphQLID },
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//     post: {
//       type: require('./postType'),
//       resolve(parentValue) {
//         return Comment.findById(parentValue).populate('post')
//           .then(comment => {
//             return comment.post
//           });
//       }
//     }
//   })
// });
//
// module.exports = CommentType;
