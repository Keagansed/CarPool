import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import '../css/App.css';


import Login from "./components/Login"

import Profile from './components/Profile';
import Vouching from './components/Vouching';

class App extends Component {

  // render() {
  //   return (
  //     <div className="App">
  //       < Login/>
  //     </div>
  //   );
  // }

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

export default App;
