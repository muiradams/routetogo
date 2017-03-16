const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./client/index.js', './client/sass/style.sass'],
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        include: path.join(__dirname, 'client/sass'),
        loaders: ['style-loader', 'css-loader', 'sass-loader'], 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' })
  ],
};
