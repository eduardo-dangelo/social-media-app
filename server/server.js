const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://eduardo:test@ds263948.mlab.com:63948/user-auth';

console.log('/---------------------------------/')
console.log('/--------SOCIAL-MEDIA-APP----V1---/')
console.log('/---------------------------------/')

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI, { promiseLibrary: global.Promise });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

// // ES6 promises
// mongoose.Promise = Promise;
//
// // mongodb connection
// mongoose.connect(MONGO_URI, {
//   // useMongoClient: true,
//   promiseLibrary: global.Promise
// });
//
// const db = mongoose.connection;
//
// // mongodb error
// db.on('error', console.error.bind(console, 'connection error:'));
//
// // mongodb connection open
// db.once('open', () => {
//   console.log(`Connected to Mongo at: ${new Date()}`)
// });

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

// app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
