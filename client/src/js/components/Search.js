import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import "../utils/searchQuery.js";
import '../../css/App.css';

class Search extends Component {

	render(){
		
		return(

            <div className="center_container search_center_container">
				<br />
				<div className="bubble">
                    <div className="row no-padding-margin">
			            <div className="col-md-8 offset-md-2">
			            	<form id="searchUsers">
				                <div className="row">
				                    <div className="col-md-8 col-8 no-padding-margin">
				                        <div className="input-group c-search">
				                            <input type="text" className="form-control" id="user-search"/>
				                        </div>
				                    </div>
				                    <div className="col-md-4 col-4 no-padding-margin">
				                    	<button type="submit" className="btn btn-info" >Search</button>								
				                    </div>
				                </div> <br />
				            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div id="user-list" className="col-md-8 offset-md-2">			{/*results get added to this list*/}
                            {/*<li className="list-group-item">
			                        <div className="col-md-8">
			                           <span className="name"></span><br/>
			                        </div>
			                    </li>*/}
                        </div>
                    </div>
				</div>
			</div>
		);
	}
}

export default Search;