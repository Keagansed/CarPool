import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import "../utils/searchQuery.js";
import '../../css/components/Search.css';

class Search extends Component {

	render(){
		
		return(

			<div className="container">
				<br />
				<div className="row">
			        <div className="col-md-8 col-sm-offset-6">
			            <div className="panel panel-default">
			            	<form id="searchUsers">
				                <div className="row">
				                    <div className="col-md-10">
				                        <div className="input-group c-search">
				                            <input type="text" className="form-control" id="user-search"/>
				                        </div>
				                    </div>
				                    <div className="col-md-2">
				                    	<button type="submit" className="btn btn-info" >Search</button>								
				                    </div>
				                </div> <br />
				            </form>
			                
			                <ul className="list-group" id="user-list">			{/*results get added to this list*/}
			                    {/*<li className="list-group-item">
			                        <div className="col-md-8">
			                           <span className="name"></span><br/>
			                        </div>
			                    </li>*/}
			                </ul>
			            </div>
			        </div>
				</div>
			</div>
		);
	}
}

export default Search;