import React, { Component } from 'react';

import { searchUsers } from "../utils/searchQuery.js";
import SearchResultList from './search/SearchResultList.js'

class Search extends Component {
	goPro(){
		alert("fuckyeah");
	}

	constructor()
	{
		super();
		this.state = {
			searchResults:""
		};
	}

	handleChange = (event) =>
	{
		searchUsers(event.target.value).then(res => {
			this.setState({searchResults : res});
		});
	}
	
	render(){
		
		return(
			
            <div className="center_container search_center_container">
                    <div className="row no-padding-margin search-container">
			            <div className="col-md-8 offset-md-2 no-padding">
			            	<form id="searchUsers">
				                <div className="row">
				                    <div className="col-md-12 col-12 no-padding-margin">
				                        <div className="input-group c-search">
				                            <input type="text" className="form-control" id="user-search" onChange={this.handleChange} autoComplete="off" placeholder="Search"/>
				                        </div>
				                    </div>
				                </div>
				            </form>
						{/*results injected into this class*/}
						<SearchResultList results={this.state.searchResults}/>		                		                
			            </div>
			        </div>
			</div>
		);
	}
}

export default Search;
