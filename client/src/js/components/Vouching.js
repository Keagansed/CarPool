import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js'; 

import '../../css/components/Vouch.css';

import VouchList from './vouching/VouchList';
import VouchAverage from './vouching/VouchAverage';
import VouchTally from './vouching/VouchTally';
import "../utils/vouchQuery.js";

class Vouching extends Component {
  //~ constructor(props){
    //~ super(props);
  //~ }

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

            <div className="modal fade" id="vouchModal" >
            <div className="modal-dialog">
              <div className="modal-content" style={{backgroundColor: "#9c9c9c"}}>
                <form id="vouchSubmit">
                          <div className="form-group">
                              <label>Rating</label>
                              <div>
                                <button id="star1" key={Math.random()} type="button" className="btn btn-warning btn-sm star-btn" aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"></i>
                                </button>
                                <button id="star2" key={Math.random()} type="button" className="btn btn-default btn-sm star-btn" aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"></i>
                                </button>
                                <button id="star3" key={Math.random()} type="button" className="btn btn-default btn-sm star-btn" aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"></i>
                                </button>
                                <button id="star4" key={Math.random()} type="button" className="btn btn-default btn-sm star-btn" aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"></i>
                                </button>
                                <button id="star5" key={Math.random()} type="button" className="btn btn-default btn-sm star-btn" aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"></i>
                                </button>
                              </div>
                              

                          </div>
                          <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <input type="text" className="form-control" id="title" placeholder="Title"/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="review">Review</label>
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
