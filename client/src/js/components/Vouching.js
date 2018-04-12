import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../css/App.css';

import VouchList from './vouching/VouchList';
import VouchAverage from './vouching/VouchAverage';
import VouchTally from './vouching/VouchTally';
import "../utils/vouchQuery.js";

class Vouching extends Component {
	constructor(props){
		super(props);
		this.state = {
			_id: ""
		}
	}

  componentWillMount(){
	this.setState({_id: this.props.match.params._id});
  }

  render() {
    return (
        <div className="center_container vouching_center_container">
            <div className="row">
                <div className="col-md-5 bubble no-padding-margin">
                        <VouchAverage _id={this.state._id}/>
                        <VouchTally _id={this.state._id} />
                        <button id="addReview" className="btn btn-primary margin-top" type="submit" data-toggle="modal" data-target="#vouchModal">Vouch</button>
                </div>

                <div className="col-sm-5 offset-md-2 bubble">
                    <div className="info-div">
                        <VouchList _id={this.state._id} />
                    </div>
                </div>
            </div>

            <div className="modal fade" id="vouchModal" data-id={this.props._id}>
                <div className="modal-dialog">
                    <div className="modal-content bubble-more-visible">
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
                          <button type="submit" className="btn btn-secondary" >Submit</button>
                        </form>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Vouching;
