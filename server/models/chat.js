const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message'
  }],
});

ChatSchema.statics.sendMessage = function(id, userId, content) {
  const Message = mongoose.model('message');

  return this.findById(id)
    .then(chat => {
      const message = new Message({ id, content, userId, chat })
      chat.messages.push(message)
      return Promise.all([message.save(), chat.save()])
        .then(([message, chat]) => chat);
    });
}

ChatSchema.statics.findMessages = function(id) {
  return this.findById(id)
    .populate('messages')
    .then(chat => chat.messages);
}

ChatSchema.statics.findUsers = function(id) {
  return this.findById(id)
    .populate('users')
    .then(chat => chat.users);
}

ChatSchema.statics.addUser = function(chatId, userId) {
  const User = mongoose.model('user');
  return this.findById(chatId)
    .then(chat => {
      const user = User.findById(userId)
      chat.users.push(user)
      return Promise.all([user.save(), chat.save()])
        .then(([user, chat]) => chat);
    });
}

mongoose.model('chat', ChatSchema);
