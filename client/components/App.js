import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const App = props => (
  <div>
    <form>
      {props.children}
    </form>
  </div>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
