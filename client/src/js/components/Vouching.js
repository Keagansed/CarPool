import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import '../../css/components/Vouch.css';

import VouchList from './vouching/VouchList';
import VouchAverage from './vouching/VouchAverage';
import VouchTally from './vouching/VouchTally';

class Vouching extends Component {
  //~ constructor(props){
    //~ super(props);
  //~ }

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
