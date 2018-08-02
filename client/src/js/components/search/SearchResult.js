// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import ProfileStore from '../../stores/ProfileStore.js';

/**
* Purpose: This is a result component, that populates the results of the search.
*/
class SearchResult extends Component {
	/*
    * Used to set which profile is active in the ProfileStore
    */	
	setProfile() {
		ProfileStore.getProfile(this.props.result._id);
	}
	
	render() {
		const res = this.props.result;

		return(
			<Link 
				onClick={this.setProfile} 
				to={'/profile/'+res._id}
			>
				<div className="row searchItem">
					<div className="name">
						{res.firstName +" "+ res.lastName}
					</div>
				</div>
			</Link>
		);
	}
}

export default SearchResult;