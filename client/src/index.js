import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Login from './js/components/Login';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<Login />, document.getElementById('root'));

registerServiceWorker();
