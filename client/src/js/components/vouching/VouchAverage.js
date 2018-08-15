// File Type: Component

import React, { Component } from 'react';

import 'font-awesome/css/font-awesome.min.css';

/**
 * Purpose: Display the average vouches of the user
 */
class VouchAverage extends Component {
	constructor(props){
		super(props);
		
		this.state ={vouches: []};
	}
	
	componentDidMount(){
		const idFor = this.props._id;
		fetch('/api/account/vouch/getVouches?idFor='+idFor)
		.then(res => res.json())
		.then(vouches => {
			if (vouches.success) {
				this.setState({vouches: vouches.data})
			}
		});
	}
	
	averageRating = ()=> {
		let total = 0;
		let reviews = 0;
		let average;

		for(let x in this.state.vouches) {
			if(x){
				reviews++;
				total += this.state.vouches[x].rating;
			}
		}
		
		if(total!==0 && reviews!==0) {
			average = total/reviews;
		}else {
			average = 0;
		}
		
		average = Math.round( average * 10 ) / 10;

		return average;
	}
	
	printStars = ()=> {
		let starElements = [];
		let n = Math.trunc(this.averageRating());
		let i;
		
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
		);
	}
}

export default VouchAverage;
