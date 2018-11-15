const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  likes: { type: Number, default: 0 },
  content: { type: String },
  // userId: { type: Schema.Types.ObjectId },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});

CommentSchema.statics.like = function(id) {
  const Comment = mongoose.model('comment');

  return Comment.findById(id)
    .then(comment => {
      ++comment.likes;
      return comment.save();
    })
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
