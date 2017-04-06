import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import App from './components/App';

// Location of dependencies for webpack to pre-compile
import styleToPrecompile from './sass/style.sass';
import background from '../public/images/background.jpg';
import loading from '../public/images/loading.svg';

const client = new ApolloClient();

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
