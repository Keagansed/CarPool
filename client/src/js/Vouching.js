import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 

import '../css/Vouch.css';

import VouchList from './components/VouchList';
import VouchAverage from './components/VouchAverage';
import VouchTally from './components/VouchTally';
import "./utils/vouchQuery.js";

class Vouching extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
            <div className="row">
              <div className="col-sm-3">
                <VouchAverage _id="5ac0b4c25a00385a1f7b6d99"/>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3">
                <VouchTally _id="5ac0b4c25a00385a1f7b6d99"/>
              </div>
            </div>
           
            <div className="col-sm-12">
              <VouchList _id="5ac0b4c25a00385a1f7b6d99"/>
            </div>
            

            <div className="row col-sm-3">
              <div style={{position:"absolute"}}>
                  <button id="addReview" className="btn btn-lg btn-block" type="submit" style={{margin:"15px",width:"100%",backgroundColor:"dodgerblue",alignSelf: "center"}} data-toggle="modal" data-target="#vouchModal"><strong style={{fontSize: "25px"}}>Vouch</strong></button>
              </div>
            </div>

            <div className="modal fade" id="vouchModal">
            <div className="modal-dialog">
              <div className="modal-content" >
                <form id="vouchSubmit">
                          <div className="form-group">
                              <label htmlFor ="rating">Rating</label>
                              <input type="text" className="form-control" id="rating" placeholder="Rating [1-5]"/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="title">Last Name</label>
                              <input type="text" className="form-control" id="title" placeholder="Title"/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="review">Email address</label>
                              <input type="text" className="form-control" id="review" placeholder="Review"/>
                          </div>
                          <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Vouching;
