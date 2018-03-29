import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

const Root = () => {
  return (
    <div>
      <App/>
    </div>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));