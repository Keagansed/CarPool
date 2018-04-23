import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.min.js';
import '../../css/App.css';

import VouchList from './vouching/VouchList';
import VouchAverage from './vouching/VouchAverage';
import VouchTally from './vouching/VouchTally';

import {
    getFromStorage
} from '../utils/localStorage.js'

class Vouching extends Component {
	constructor(props){
		super(props);
		this.state = {
		    changeRating: false,
			_id: ""
		}
	}

	yellowStar = "btn btn-warning btn-sm star-btn";
	greyStar = "btn btn-default btn-sm star-btn";

	oneClass = this.yellowStar;
	twoClass = this.greyStar;
	threeClass = this.greyStar;
	fourClass = this.greyStar;
	fiveClass = this.greyStar;

	rating = 1;

    oneStarClick()
    {
        this.rating = 1;
        this.twoClass = this.greyStar;
        this.threeClass = this.greyStar;
        this.fourClass = this.greyStar;
        this.fiveClass = this.greyStar;
        this.setState({changeRating: !this.state.changeRating});
    }

    twoStarClick()
    {
        this.rating = 2;
        this.twoClass = this.yellowStar;
        this.threeClass = this.greyStar;
        this.fourClass = this.greyStar;
        this.fiveClass = this.greyStar;
        this.setState({changeRating: !this.state.changeRating});
    }

    threeStarClick()
    {
        this.rating = 3;
        this.twoClass = this.yellowStar;
        this.threeClass = this.yellowStar;
        this.fourClass = this.greyStar;
        this.fiveClass = this.greyStar;
        this.setState({changeRating: !this.state.changeRating});
    }

    fourStarClick()
    {
        this.rating = 4;
        this.twoClass = this.yellowStar;
        this.threeClass = this.yellowStar;
        this.fourClass = this.yellowStar;
        this.fiveClass = this.greyStar;
        this.setState({changeRating: !this.state.changeRating});
    }

    fiveStarClick()
    {
        this.rating = 5;
        this.twoClass = this.yellowStar;
        this.threeClass = this.yellowStar;
        this.fourClass = this.yellowStar;
        this.fiveClass = this.yellowStar;
        this.setState({changeRating: !this.state.changeRating});
    }

    submitVouch()
    {
        const obj = getFromStorage('sessionKey');
        if(obj.token != document.getElementById("vouchModal").getAttribute("data-id"))
        {
            fetch('/api/account/submitVouch',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    idBy:obj.token,
                    idFor:document.getElementById("vouchModal").getAttribute("data-id"),
                    rating:this.rating,
                    date:new Date(),
                    reviewTitle:document.getElementById("title").value,
                    reviewBody:document.getElementById("review").value
                })
            })
                .then(res=>res.json())
                .catch(error => console.error('Error:', error))
                .then(json=>{
                    console.log('json',json); //========== Probably remove ===============
                });
            window.location.reload();
        }
        else
        {
            window.alert("You may not vouch for yourself");
        }
    }

  componentWillMount(){
	this.setState({_id: this.props.match.params._id});
  }

  render() {
      const obj = getFromStorage('sessionKey');
      var vouchButton = (<span/>);

      if(this.state._id != obj.token)
      {
          vouchButton = (<button id="addReview" className="btn btn-primary margin-top" type="submit" data-toggle="modal" data-target="#vouchModal">Vouch</button>);
      }


    return (
        <div className="center_container vouching_center_container">
            <div className="row">
                <div className="col-md-5 bubble no-padding-margin">
                        <VouchAverage _id={this.state._id}/>
                        <VouchTally _id={this.state._id} />
                        {vouchButton}
                </div>

                <div className="col-sm-5 offset-md-2 bubble">
                    <div className="info-div">
                        <VouchList _id={this.state._id} />
                    </div>
                </div>
            </div>

            <div className="modal fade" id="vouchModal" data-id={this.state._id}>
                <div className="modal-dialog">
                    <div className="modal-content bubble-more-visible">
                <form id="vouchSubmit">
                          <div className="form-group">
                              <label>Rating</label>
                              <div>
                                <button id="star1" key={Math.random()} type="button" className={this.oneClass} onClick={this.oneStarClick.bind(this)} aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"/>
                                </button>
                                <button id="star2" key={Math.random()} type="button" className={this.twoClass} onClick={this.twoStarClick.bind(this)} aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"/>
                                </button>
                                <button id="star3" key={Math.random()} type="button" className={this.threeClass} onClick={this.threeStarClick.bind(this)} aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"/>
                                </button>
                                <button id="star4" key={Math.random()} type="button" className={this.fourClass} onClick={this.fourStarClick.bind(this)} aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"/>
                                </button>
                                <button id="star5" key={Math.random()} type="button" className={this.fiveClass} onClick={this.fiveStarClick.bind(this)} aria-label="Left Align">
                                  <i className="fa fa-star" aria-hidden="true"/>
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
                          <button className="btn btn-secondary" onClick={this.submitVouch.bind(this)} >Submit</button>
                        </form>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

export default Vouching;
