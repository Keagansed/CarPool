import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileStore from '../../stores/ProfileStore.js';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

class SearchResult extends Component {	
	setProfile()
	{
		ProfileStore.getProfile(this.props.result._id);
	}
	
	render()
	{
		const res = this.props.result;
		return(
			<Link onClick={this.setProfile} to={'/profile/'+res._id}>
				<div className="row searchItem">
					<div className="name">
						{res.firstName +" "+ res.lastName}
					</div>
				</div>
			</Link>);
	}
}

export default SearchResult;