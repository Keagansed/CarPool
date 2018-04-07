import React, { Component } from 'react';
import logo from '../res/images/logo.svg';
import '../css/App.css';
import Login from "./components/Login"

class App extends Component {

  render() {
    return (
      <div className="App">
        < Login/>
      </div>
    );
  }
}

export default App;
