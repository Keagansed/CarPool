import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './index.css';

import Login from './js/components/Login';
import Profile from './js/components/Profile';
import Vouching from './js/components/Vouching';

import registerServiceWorker from './js/registerServiceWorker';

// <<<<<<< HEAD


// ReactDOM.render(<Vouching />, document.getElementById('root'));

// =======
class App extends React.Component{
	render(){
		return(
			<BrowserRouter>
				<Switch>
					<Route path={"/"} exact component={Login}/>
					<Route path={"/profile/:_id"} exact component={Profile}/>
					<Route path={"/vouching/:_id"} exact component={Vouching}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
// >>>>>>> 1afe8dc8b30fec5fc078d78a18a1b2af57aa5d95

registerServiceWorker();
