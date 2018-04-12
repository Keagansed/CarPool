import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './index.css';

import Login from './js/components/Login';
import Profile from './js/components/Profile';
import Vouching from './js/components/Vouching';

import registerServiceWorker from './js/registerServiceWorker';

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

registerServiceWorker();
