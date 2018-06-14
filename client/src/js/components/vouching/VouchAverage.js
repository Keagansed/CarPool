import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 

// import '../../../css/style.css';

import 'font-awesome/css/font-awesome.min.css';

class VouchAverage extends Component {
  constructor(props){
    super(props);

    this.state ={vouches: []};
  }

  componentDidMount(){
      const idFor = this.props._id;
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
        reviews++;
        total += this.state.vouches[x].rating;
      }
    }

    var average;

    if (total!==0 && reviews!==0) 
    {
      average = total/reviews;
    }
    else
    {
      average = 0;
    }
    

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
        <button key={Math.random()} type="button" className="btn btn-warning btn-sm star-btn" aria-label="Left Align">
          <i key={Math.random()} className="fa fa-star" aria-hidden="true"></i>
        </button>
      );
    }
    for(i = 0; i < 5-n; i = i + 1) {
      // For each element, push a React element into the array
      starElements.push(
        <button key={Math.random()} type="button" className="btn btn-default btn-sm star-btn" aria-label="Left Align">
          <i key={Math.random()} className="fa fa-star" aria-hidden="true"></i>
        </button>
      );
    }

    return starElements;
  }

  render() {
    return (
      <font>
        {this.averageRating().toFixed(1)}
      </font>
      // <div>
      //       <div className="container-fluid">
      //         <div key={+new Date()} className="rating-breakdown">
      //         <h4 className="review-info">Average rating</h4>
      //             <h1>{this.averageRating()}<small>/ 5</small></h1>
      //             {this.printStars()}
      //         </div>
      //       </div>
      // </div>
    );
  }
}

export default VouchAverage;
