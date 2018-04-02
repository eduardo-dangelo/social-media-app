const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  userId: { type: Schema.Types.ObjectId },
  content: { type: String },
  likes: { type: Number, default: 0 },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
});

PostSchema.statics.addComment = function(id, content) {
  const Comment = mongoose.model('comment');

  return this.findById(id)
    .then(post => {
      const comment = new Comment({ content, post })
      post.comments.push(comment)
      return Promise.all([comment.save(), post.save()])
        .then(([comment, post]) => post);
    });
}

PostSchema.statics.findComments = function(id) {
  return this.findById(id)
    .populate('comments')
    .then(post => post.comments);
}

PostSchema.statics.findUser = function(id) {
  const User = mongoose.model('user');
  return this.findById(id)
    .then(post => {
      const user = User()
      post.user.push(user)
      return Promise.all([user.save(), post.save()])
        .then(([user, post]) => post);
    });
}

PostSchema.statics.like = function(id) {
  const Post = mongoose.model('post');

  return Post.findById(id)
    .then(post => {
      ++post.likes;
      return post.save();
    })
}

PostSchema.statics.unlike = function(id) {
  const Post = mongoose.model('post');

  return Post.findById(id)
    .then(post => {
      --post.likes;
      return post.save();
    })
}

mongoose.model('post', PostSchema);
