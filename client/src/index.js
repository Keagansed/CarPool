import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Login from './js/components/Login';
import App from './js/App';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
