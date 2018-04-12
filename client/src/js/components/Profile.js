import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import "../utils/fileQuery.js";
import { disableEditBut } from "../utils/editProfile.js";
import VouchAverage from "./vouching/VouchAverage"
// import VouchTally from "./vouching/VouchTally"
import Background from './Background.js';
import Search from './Search.js';

class ProfileRating extends Component
{
	render()
	{
		return(
			<div>
				<div className="profile_rating">
					< VouchAverage _id={this.props._id}/>
				</div>
				{/* <div>
					< VouchTally/>
				</div>	 */}
			</div>
		);
	}
}

class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
			user:"",
			tab:ProfileRating,
			_id:"",
			editMode: false
		};
	}
	
	componentDidMount()//every load
	{
		fetch('/api/account/getProfile?_id=' + this.state._id)
		.then(res => res.json())
		.then(json => this.setState({user: json}));
	}
	
	componentWillMount()// once
	{
		this.setState({_id:this.props._id});
	}
	
	showRatings()
	{
		this.setState({tab: ProfileRating});
	}
	
	showBackInfo()
	{
		this.setState({tab: Background});
	}
	
	showSearch()
	{
		this.setState({tab: Search});
	}
	
	toggleEditMode()
	{
		if (this.state.editMode)
			this.setState({editMode: false});
		else
			this.setState({editMode: true});
	}
	
	render() {
		const jsonPro = this.state.user[0];
		if (jsonPro)
		{
			fetch('/api/account/verify?token='+this.state._id)
		       .then(res => res.json())
		       .then(json => {
				if(!json.success){
					disableEditBut();
				}
		       });
			const userName = jsonPro.firstName;
			const name = jsonPro.firstName + " " + jsonPro.lastName;
			const profilePic = "./api/account/getImage?filename=" + jsonPro.profilePic;
			const secLvl = 1;
			const email = jsonPro.email;
			const idNum = jsonPro.id;

			if (this.state.editMode)
		       {

				return (
					<div className="container">
						<div className="Profile">
							<h1>{userName}</h1>
							<div className="row">
								<div className="col-md-5">
									<img src={profilePic} className="profilePic" alt="Profile Pic" />
									<form action="/api/account/uploadFile" method="POST" encType="multipart/form-data">
										<input type="hidden" id="userId" name="id" defaultValue={this.props._id}/>
										<input type="file" name="file" id="file" />
										<label htmlFor="file">choose file</label>
										<input type="submit" value="update" id="upProPic" />
									</form>
								</div>
								<div className="col-md-7">
									<form method="POST" action="/api/account/updateProfile" id="upProInfo">
										first name: <input id="upFName" type="text" defaultValue={jsonPro.firstName}/><br/>
										last name: <input id="upLName" type="text" defaultValue={jsonPro.lastName}/><br/>
										email: <input id="upEmail" type="email" defaultValue={email}/><br/>
										ID number: <input id="upId" type="text" defaultValue={idNum}/><br/>
										Current password: <input id="upPass" type="password"/><br/>
										New password: <input id="upPassChange" type="password" placeholder="leave blank for no change"/><br/>
										<input type="submit" value="update"/>
										<h4>Level {secLvl}</h4>
									</form>
								</div>
								<div>
									<button id="logOutSubmit">logout</button>
									<button id="startEdit" onClick={this.toggleEditMode.bind(this)}>Edit</button>
								</div>
								<div>
									<ul className="nav nav-tabs">
										<li><button onClick={this.showRatings.bind(this)}>Ratings </button></li>
										<li><button onClick={this.showBackInfo.bind(this)}>Background stuff</button></li>
										<li><button onClick={this.showSearch.bind(this)}>search</button></li>
									</ul>
									<div>
										<this.state.tab _id={this.props._id} />
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
			else
			{
// <<<<<<< profile
				// return (
				// 	<div className="container">
				// 		<div className="Profile">
				// 			<h1>{userName}</h1>
				// 			<div className="row">
				// 				<div className="col-md-5">
				// 					<img src={profilePic} className="profilePic" alt="Profile Pic" />
				// 				</div>
				// 				<div className="col-md-7">
				// 					<h3>{name}</h3>
				// 					<h4>email: {email}</h4>
				// 					<h4>ID number: {idNum}</h4>
				// 					<h4>Level {secLvl}</h4>
				// 				</div>
				// 				<button id="logOutSubmit">logout</button>
				// 				<button id="startEdit" onClick={this.toggleEditMode.bind(this)}>Edit</button>
				// 				<div>
				// 					<ul className="nav nav-tabs">
				// 						<li><button onClick={this.showRatings.bind(this)}>Ratings </button></li>
				// 						<li><button onClick={this.showBackInfo.bind(this)}>Background stuff</button></li>
				// 						<li><button onClick={this.showSearch.bind(this)}>search</button></li>
				// 					</ul>
				// 					<this.state.tab _id={this.props._id} />
				// 				</div>
				// 			</div>
				// 		</div>

				// 	</div>
				// );
// <<<<<<< profile
// >>>>>>> styling_A 
				return (
					<div>
						<div>
							<Search />
						</div>
						<div>
							<div className="center_container profile_center_container bubble">
									<div className="row full_row">
										<div className="col-md-7 col-xs-7 img-wrap">
											<img src={profilePic} id="profilePic" alt="Profile Pic" />
										</div>
										<div className="col-md-5 col-xs-5 profileUserDetails">
											<h3 className="profileUserName">{name}</h3>
											<ProfileRating _id={this.props._id}/>
											<div className="row profileSpecificDetails">
												<div className="col-md-4">
													Email
													<h6 className="profileValue">{email}</h6>
												</div>
												<div className="col-md-4">
													ID
													<h6 className="profileValue">{idNum}</h6>
												</div>
												<div className="col-md-4">
												Security
													<h6 className="profileValue">Level {secLvl}</h6>
												</div>
											</div>
											<form action="/api/account/uploadFile" method="POST" encType="multipart/form-data">
												<input type="hidden" id="userId" name="id" defaultValue={this.props._id} />
												<input type="file" name="file" id="file"/>
												<input type="submit" value="submit" id="upProPic" className="btn btn-secondary"/>
											</form>
											<button id="logOutSubmit" className="btn btn-primary">logout</button>
										</div>
									</div>
							</div> 
						</div>
					</div>
				);
// >>>>>>> styling_A
			}
		}
		else
			return (<h1>Profile not found</h1>);
	}
}

export default Profile;
