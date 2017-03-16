import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import reduxThunk from 'redux-thunk';

// React components
import App from './components/App';
import RouteResults from './components/RouteResults';
import RouteSearch from './components/RouteSearch';

// Other src files
import reducers from './reducers';
import client from './src/apolloClient';

// Location of the SASS file for webpack to pre-compile
import styleToPrecompile from './sass/style.sass';

const createStoreWithMiddleware = applyMiddleware(client.middleware())(createStore);
const store = createStoreWithMiddleware(reducers);

const Root = () => (
  <ApolloProvider client={client} store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={RouteSearch} />
        <Route path="/routes" component={RouteResults} />
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
