import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import Login from './js/components/Login';
// import VouchList from './js/components/VouchList';
// import VouchAverage from './js/components/VouchAverage';
// import VouchTally from './js/components/VouchTally';
import Vouching from './js/components/Vouching';

import registerServiceWorker from './js/registerServiceWorker';

// ReactDOM.render(<Vouching />, document.getElementById('root'));


ReactDOM.render(<Vouching />, document.getElementById('root'));

registerServiceWorker();
