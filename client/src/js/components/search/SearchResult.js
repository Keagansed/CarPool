import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 

class SearchResult extends Component {	
	render()
	{
		const res = this.props.result;
		return(<Link to={'/profile/'+res._id}>{res.firstName +" "+ res.lastName}</Link>);
	}
}

export default SearchResult;