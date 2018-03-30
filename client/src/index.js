import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './js/App';
import Login from './js/Login';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
