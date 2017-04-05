const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

module.exports = {
  devtool: 'eval',
  context: __dirname,
  entry: ['./client/index.js', './client/sass/style.sass'],
  output: {
    path: PUBLIC_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.sass$/,
        include: path.join(__dirname, 'client/sass'),
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        use: 'file-loader?name=./images/[name].[ext]',
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
  ],
};
