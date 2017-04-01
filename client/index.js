import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import App from './components/App';

// Location of the SASS file for webpack to pre-compile
import styleToPrecompile from './sass/style.sass';

const client = new ApolloClient();

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
