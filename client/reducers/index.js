import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import client from '../src/apolloClient';

const rootReducer = combineReducers({
  form: formReducer,
  apollo: client.reducer(),
});

export default rootReducer;
