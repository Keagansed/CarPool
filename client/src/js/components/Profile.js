import React, { Component } from 'react';
import '../../css/App.css';
import "../utils/fileQuery.js";
import { disableEditBut } from "../utils/editProfile.js";
import Vouching from './Vouching.js';
import Background from './Background.js';
import Search from './Search.js';

class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
			user:"",
			tab:Vouching,
			editMode: false
		};
	}
	
	componentDidMount()
	{
		fetch('/api/account/getProfile?_id=' + this.props._id)
		.then(res => res.json())
		.then(json => this.setState({user: json}));
	}
	
	showRatings()
	{
		this.setState({tab: Vouching});
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
			fetch('/api/account/verify?token='+this.props._id)
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
										<input type="submit" value="update"/>
										<h4>Level {secLvl}</h4>
									</form>
								</div>
								<button id="logOutSubmit">logout</button>
								<button id="startEdit" onClick={this.toggleEditMode.bind(this)}>Edit</button>
								<div>
									<ul className="nav nav-tabs">
										<li><button onClick={this.showRatings.bind(this)}>Ratings </button></li>
										<li><button onClick={this.showBackInfo.bind(this)}>Background stuff</button></li>
										<li><button onClick={this.showSearch.bind(this)}>search</button></li>
									</ul>
									<this.state.tab _id={this.props._id} />
								</div>
							</div>
						</div>
					</div>
				);
			}
			else
			{
				return (
					<div className="container">
						<div className="Profile">
							<h1>{userName}</h1>
							<div className="row">
								<div className="col-md-5">
									<img src={profilePic} className="profilePic" alt="Profile Pic" />
								</div>
								<div className="col-md-7">
									<h3>{name}</h3>
									<h4>email: {email}</h4>
									<h4>ID number: {idNum}</h4>
									<h4>Level {secLvl}</h4>
								</div>
								<button id="logOutSubmit">logout</button>
								<button id="startEdit" onClick={this.toggleEditMode.bind(this)}>Edit</button>
								<div>
									<ul className="nav nav-tabs">
										<li><button onClick={this.showRatings.bind(this)}>Ratings </button></li>
										<li><button onClick={this.showBackInfo.bind(this)}>Background stuff</button></li>
										<li><button onClick={this.showSearch.bind(this)}>search</button></li>
									</ul>
									<this.state.tab _id={this.props._id} />
								</div>
							</div>
						</div>
					</div>
				);
			}
		}
		else
			return (<h1>Profile not found</h1>);
	}
}

export default Profile;
