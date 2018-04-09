import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'; 

//~ import '../../css/components/Vouch.css'

import 'font-awesome/css/font-awesome.min.css';

class VouchList extends Component {
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

  getDate(dat)
  {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var newdate = day + "/" + month + "/" + year;
    return newdate
  }

  printStars(numStars)
  {
    var starElements = [],
    n = numStars,
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
            {this.state.vouches.map(vouch =>
              // <li key={vouch.idFor}>{vouch.idBy}</li>
              <div key={vouch.idBy} className="row review voucher-info" styles={{margin: 0}}>
                    <div className="col-4">
                        <img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" className="img-rounded" alt="" ></img>
                        <div><a href="/"><span className='review-info'>{vouch.idBy}</span></a></div>
                        <div className='review-info'> {this.getDate(vouch.date)} <br/></div>
                        {this.printStars(vouch.rating)}
                    </div>
                    <div className="col-8">
                        <h4 className='review-info'><strong>{vouch.reviewTitle}</strong><span className="glyphicon glyphicon-star" aria-hidden="true"></span></h4>
                        <div>{vouch.reviewBody}</div>
                    </div>
              </div>
            )}
            </div>
      </div>
    );
  }
}

export default VouchList;
