const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './client/index.js',
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        loaders: 'style-loader!css-loader!sass-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      mode: 'development'
    })
  ]
};