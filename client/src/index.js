import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Vouching from './js/Vouching';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<Vouching />, document.getElementById('root'));
registerServiceWorker();
