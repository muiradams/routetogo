import React from 'react';

const App = (props) => {
  return (
    <div>
      Flight Paths
      {props.children}
    </div>
  );
}

export default App;
