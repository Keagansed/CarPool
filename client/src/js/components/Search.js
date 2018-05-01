import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import "../utils/searchQuery.js";
import '../../css/App.css';

class Search extends Component {	
	render(){
		
		return(

            <div className="center_container search_center_container">
				{/* <div className="bubble"> */}
                    <div className="row no-padding-margin search-container">
			            <div className="col-md-8 offset-md-2 no-padding">
			            	<form id="searchUsers">
				                <div className="row">
				                    <div className="col-md-12 col-12 no-padding-margin">
				                        <div className="input-group c-search">
				                            <input type="text" className="form-control" id="user-search" autoComplete="off" placeholder="Search"/>
				                        </div>
				                    </div>
				                   {/* <div className="col-md-2">
				                    	<button type="submit" className="btn btn-info" >Search</button>								
				                    </div>*/}
				                </div>
				            </form>
							<ul className="" id="user-list">			{/*results injected into this class*/}
			                    
							</ul>			                		                
			            </div>
			        </div>
				{/* </div> */}
			</div>
		);
	}
}

export default Search;
