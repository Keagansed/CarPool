import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import '../css/Vouch.css';

import VouchList from './components/VouchList';
import VouchAverage from './components/VouchAverage';
import VouchTally from './components/VouchTally';

class Vouching extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
            <VouchAverage/>
            <VouchTally />
            <VouchList/>

      </div>
    );
  }
}

export default Vouching;
