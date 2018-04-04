import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import '../../css/Vouch.css'

import 'font-awesome/css/font-awesome.min.css';

class VouchAverage extends Component {
  constructor(props){
    super(props);

    this.state ={vouches: []};
  }

  componentDidMount(){
      const idFor = 2;
      fetch('/api/account/getVouches?idFor='+idFor)
       .then(res => res.json())
       .then(vouches => this.setState({vouches}));
  }

  averageRating()
  {
    var total = 0;
    var reviews = 0;
    

    for (var x in this.state.vouches)
    {
      if(x)
      {
        console.log(this.state.vouches[x].rating);
        reviews++;
        total += this.state.vouches[x].rating;
      }
    }

    var average = total/reviews;

    average = Math.round( average * 10 ) / 10;

    return average;
  }

  printStars()
  {
    var starElements = [],
    n = Math.trunc(this.averageRating()),
    i;
  
    for(i = 0; i < n; i = i + 1) {
      // For each element, push a React element into the array
      starElements.push(
        <button type="button" className="btn btn-warning btn-sm star-btn" aria-label="Left Align">
          <i class="fa fa-star" aria-hidden="true"></i>
        </button>
      );
    }
    for(i = 0; i < 5-n; i = i + 1) {
      // For each element, push a React element into the array
      starElements.push(
        <button type="button" className="btn btn-default btn-sm star-btn" aria-label="Left Align">
          <i class="fa fa-star" aria-hidden="true"></i>
        </button>
      );
    }

    return starElements;
  }

  render() {
    return (
      <div>
            <div className="container-fluid">
              <div className="col-sm-5 rating-breakdown">
              <h4 className="review-info">Average rating</h4>
                  <h1>{this.averageRating()}<small>/ 5</small></h1>
                  {this.printStars()}
              </div>
            </div>
      </div>
    );
  }
}

export default VouchAverage;
