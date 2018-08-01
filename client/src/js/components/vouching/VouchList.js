// File Type: Component

import React, { Component } from 'react';

// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'font-awesome/css/font-awesome.min.css';

/**
* Purpose: Interface to view all the vouches the user has received
*/
class VouchList extends Component {
	constructor(props){
		super(props);
		
		this.state ={vouches: [], user:[]};
	}
	
	componentDidMount(){
		const idFor = this.props._id;
		fetch('/api/account/vouch/getVouches?idFor='+idFor)
		.then(res => res.json())
		.then(vouches => this.setState({vouches}));
		
		fetch('/api/account/profile/getAllUsers')
		.then(res => res.json())
		.then(json => this.setState({user: json}));  
	}
	
	getDate(dat){
		let dateObj = new Date(dat);
		let month = dateObj.getUTCMonth() + 1; //months from 1-12
		let day = dateObj.getUTCDate();
		let year = dateObj.getUTCFullYear();
		
		let  newdate = day + "/" + month + "/" + year;
		return newdate
	}
	
	getUsername(_id){
		for (let x in this.state.user){
			if(this.state.user[x]._id === _id){
				return this.state.user[x].firstName;
			}
		}
		
	}
	
	printStars(numStars){
		let  starElements = [],
		n = numStars,
		i;
		
		for(i = 0; i < n; i = i + 1) {
			// For each element, push a React element into the array
			starElements.push(
				<button key={Math.random()} type="button" className="btn btn-warning btn-sm star-btn" aria-label="Left Align">
				<i className="fa fa-star" aria-hidden="true"></i>
				</button>
			);
		}
		for(i = 0; i < 5-n; i = i + 1) {
			// For each element, push a React element into the array
			starElements.push(
				<button key={Math.random()} type="button" className="btn btn-default btn-sm star-btn" aria-label="Left Align">
				<i className="fa fa-star" aria-hidden="true"></i>
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
					<div key={Math.random()} className="row margin-bottom review voucher-info">
						<div className="row col-md-12 small-margin-bottom">
							{this.printStars(vouch.rating)}
						</div>
						<div className="row col-md-12">
							<div className="col-4">
								<img src="http://dummyimage.com/60x60/666/ffffff&text=No+Image" alt="Profile pic" className="img-rounded"></img>
								<div><a href="."><span className='review-info'>{this.getUsername(vouch.idBy)}</span></a></div>
								<div className='review-info'> {this.getDate(vouch.date)} <br /></div>
							</div>
							<div className="col-8">
								<h4 className='review-info'><strong>{vouch.reviewTitle}</strong><span className="glyphicon glyphicon-star" aria-hidden="true"></span></h4>
								<div>{vouch.reviewBody}</div>
							</div>
						</div>
					</div>
				)}
				</div>
			</div>
		);
	}
}

export default VouchList;
