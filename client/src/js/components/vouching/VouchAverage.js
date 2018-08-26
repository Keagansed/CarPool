// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import VouchStore from './../../stores/VouchStore';

import 'font-awesome/css/font-awesome.min.css';

/**
 * Purpose: Display the average vouches of the user
 */
@observer class VouchAverage extends Component {

/**
 * VouchStore.vouchesFor will be populated by Vouches.js component
 */
	averageRating = ()=> {
		let total = 0;
		let reviews = 0;
		let average;

		VouchStore.vouchesFor.forEach(vouch => {
			reviews++;
			total += vouch.rating;
		});
		
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
