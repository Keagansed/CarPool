import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

<<<<<<< HEAD
<<<<<<< HEAD
// import App from './js/App';
import Login from './js/components/Login';
import VouchList from './js/components/VouchList';
import VouchAverage from './js/components/VouchAverage';
import VouchTally from './js/components/VouchTally';
=======
>>>>>>> 99771693f540b07a45716e9688f21cac13bb3d6a
import Vouching from './js/components/Vouching';
import Login from './js/components/Login';

import registerServiceWorker from './js/registerServiceWorker';

<<<<<<< HEAD
ReactDOM.render(<Vouching />, document.getElementById('root'));
=======
import App from './js/App';
//import Login from './js/components/Login';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> Login/Register
=======
ReactDOM.render(<Login />, document.getElementById('root'));
>>>>>>> 99771693f540b07a45716e9688f21cac13bb3d6a
registerServiceWorker();
