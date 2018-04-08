import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import '../../css/components/Vouch.css';

import VouchList from './VouchList';
import VouchAverage from './VouchAverage';
import VouchTally from './VouchTally';

class Vouching extends Component {
  // constructor(props){
  //   super(props);
  // }

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
