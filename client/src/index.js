import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Vouching from './js/components/Vouching';
import Profile from './js/components/Profile';
import Login from './js/components/Login';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<Vouching />, document.getElementById('root'));
registerServiceWorker();
