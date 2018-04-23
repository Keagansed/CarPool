import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import "../utils/fileQuery.js";
import { disableEditBut } from "../utils/editProfile.js";
import VouchAverage from "./vouching/VouchAverage"
// import VouchTally from "./vouching/VouchTally"
import Background from './Background.js';
import Search from './Search.js';

class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
			user:"",
			//~ tab:Vouching,
			_id:"",
			editMode: false
		};
	}
	
	goVouch(){
		this.props.history.push('/vouching/' + this.state._id);
	}
	
	componentDidMount()//every load
	{
		fetch('/api/account/getProfile?_id=' + this.state._id)
		.then(res => res.json())
		.then(json => this.setState({user: json}));
	}
	
	componentWillMount()// once
	{
		const { match: {params}} = this.props;
		this.setState({_id:params._id});
	}
	
	showRatings()
	{
		//~ this.setState({tab: Vouching});
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
			//~ const userName = jsonPro.firstName;
			const name = jsonPro.firstName + " " + jsonPro.lastName;
			const profilePic = "../api/account/getImage?filename=" + jsonPro.profilePic;
			const secLvl = 1;
			const email = jsonPro.email;
			const idNum = jsonPro.id;

			if (this.state.editMode)
		       {

				return (
					<div>
						<div>
							<div>
								<Search />
							</div>
							<div className="center_container profile_center_container bubble">
								<div className="row full_row">
									<div className="col-md-7 col-sm-12 img-wrap">
										<img src={profilePic} id="profilePic" className="profilePic" alt="Profile Pic" />
										<form action="/api/account/uploadFile" method="POST" encType="multipart/form-data">
											<input type="hidden" id="userId" name="id" defaultValue={this.state._id} />
											<input type="file" name="file" id="file"/>
											<input type="submit" value="submit" id="upProPic" className="btn btn-secondary"/>
										</form>
									</div>
									<div className="col-md-5 col-sm-7 profileUserDetails">
										<form method="POST" action="/api/account/updateProfile" id="upProInfo">
											first name: <input className="shorten" id="upFName" type="text" defaultValue={jsonPro.firstName}/><br/>
											last name: <input className="shorten" id="upLName" type="text" defaultValue={jsonPro.lastName}/><br/>
											<div className="row profileSpecificDetails">
												<div className="col-md-12">
													Email:
													<input className="shorten" id="upEmail" type="email" defaultValue={email}/>
												</div>
												<div className="col-md-12">
													ID:
													<input className="shorten" id="upId" type="text" defaultValue={idNum}/>
												</div>
												<div className="col-md-12">
													Current password: 
													<input className="shorten" id="upPass" type="password"/>
												</div>
												<div className="col-md-12">
													New password: 
													<input className="shorten" id="upPassChange" type="password" placeholder="leave blank for no change"/>
												</div>
												<div className="col-md-12">
												Security:
													<h6 className="profileValue">Level {secLvl}</h6>
												</div>
											</div>
											<input className="btn btn-primary" type="submit" value="update"/>
										</form>
										<button id="startEdit" onClick={this.toggleEditMode.bind(this)} className="btn btn-primary">stop editiing</button>
										<div>
											<button id="logOutSubmit" className="btn btn-primary">logout</button>
										</div>
									</div>
								</div>
							</div> 
						</div>
					</div>
				);
			}
			else
			{
				return (
					<div>
						<div>
							<Search />
						</div>
						<div>
							<div className="center_container profile_center_container bubble">
								<div className="row full_row">
									<div className="col-md-7 col-sm-12 img-wrap">
										<img src={profilePic} className="profilePic" alt="Profile Pic" />
									</div>
									<div className="col-md-5 col-sm-7 profileUserDetails">
										<h3 className="profileUserName">{name}</h3>
										<div className="row profileSpecificDetails">
											<div className="col-md-5 col-sm-6 col-sx-12">
												Email:
												<h6 className="profileValue">{email}</h6>
											</div>
											<div className="col-md-5 col-sm-6 col-sx-12">
												ID:
												<h6 className="profileValue">{idNum}</h6>
											</div>
											<div className="col-md-5 col-sm-6 col-sx-12">
											Security:
												<h6 className="profileValue">Level {secLvl}</h6>
											</div>
										</div>

										<button id="startEdit" onClick={this.toggleEditMode.bind(this)} className="btn btn-primary">edit profile</button>

										<div onClick={this.goVouch.bind(this)}>
											<div className="profile-vouch">
												< VouchAverage _id={this.state._id}/>
											</div>
										</div>
										<div>
											<Redirect to={"/"}>
												<button id="logOutSubmit" className="btn btn-primary">logout</button>
											</Redirect>
										</div>
									</div>
								</div>
							</div> 
						</div>
					</div>
				);
			}
		}
		else
			return (
				<div>

				</div>
				);
	}
}

export default Profile;
