import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Location of the SASS file for webpack to compile
import style from './sass/style.sass';

const Root = () => {
  return (
    <div>
      <App />
    </div>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));