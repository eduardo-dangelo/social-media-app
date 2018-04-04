const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'chat'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // likes: { type: Number, default: 0 },
  content: { type: String }
});

// MessageSchema.statics.like = function(id) {
//   const Comment = mongoose.model('comment');
//
//   return Comment.findById(id)
//     .then(comment => {
//       ++comment.likes;
//       return comment.save();
//     })
// }
//
// MessageSchema.statics.unlike = function(id) {
//   const Comment = mongoose.model('comment');
//
//   return Comment.findById(id)
//     .then(comment => {
//       --comment.likes;
//       return comment.save();
//     })
// }

mongoose.model('message', MessageSchema);
