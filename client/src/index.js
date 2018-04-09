import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Vouching from './js/components/Vouching';
import Login from './js/components/Login';
import Search from './js/components/Search';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<Search />, document.getElementById('root'));
registerServiceWorker();
