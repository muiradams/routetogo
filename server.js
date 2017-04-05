const express = require('express');
const path = require('path');
const postgraphql = require('postgraphql').postgraphql;
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();
const port = process.env.PORT || 4000;

// TODO: needs to point to location of database on server for production
const DB_URI = 'postgres://localhost:5432/routetogo';

app.use(postgraphql(DB_URI, {
  disableDefaultMutations: true,
  graphiql: true,
  graphqlRoute: '/graphql',
}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  console.log('Directory files are being served from: ', __dirname + '/public/')

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
    console.log('The resolved path: ', path.resolve(__dirname, 'index.html'));
  });
} else {
  /**
  * In development, Webpack runs as a middleware.  If any request comes in for
  * the root route ('/') Webpack will respond with the output of the webpack
  * process: an HTML file and a single bundle.js output of all of our client
  * side Javascript
  */

  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    index: 'index.html',
  }));
}

app.listen(port, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Server started...');
  } else {
    console.log(`Listening at port ${port}...`);
  }
});
