const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  // likes: { type: Number, default: 0 },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'like'
  }],
  content: { type: String },
  // userId: { type: Schema.Types.ObjectId },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});

// CommentSchema.statics.like = function(id) {
//   const Comment = mongoose.model('comment');
//
//   return Comment.findById(id)
//     .then(comment => {
//       ++comment.likes;
//       return comment.save();
//     })
// }

CommentSchema.statics.findLikes = function(id) {
  return this.findById(id)
    .populate('likes')
    .then(post => post.likes);
}

CommentSchema.statics.like = function(id, user) {
  const Like = mongoose.model('like');

  return this.findById(id)
    .then(comment => {
      const like = new Like({ comment, user })
      comment.likes.push(like)
      return Promise.all([like.save(), comment.save()])
        .then(([like, comment]) => comment);
    });
}

CommentSchema.statics.unlike = function(id) {
  const Comment = mongoose.model('comment');

  return Comment.findById(id)
    .then(comment => {
      --comment.likes;
      return comment.save();
    })
}

mongoose.model('comment', CommentSchema);
