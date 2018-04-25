import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import "../utils/fileQuery.js";
import { editSubmit } from "../utils/editProfileQuery.js";
import { Link }  from 'react-router-dom';
import VouchAverage from "./vouching/VouchAverage"
// import VouchTally from "./vouching/VouchTally"
//~ import Background from './Background.js';
import Search from './Search.js';

class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
			user:"",
			_id:"",
			editButton: "button",
			editMode: false,
			eFName:"",
			eLName:"",
			eEmail:"",
			eID:"",
			ePass:"",
			eNewPass:""
		};
	}
	
	componentDidMount()//every load
	{
		fetch('/api/account/getProfile?_id=' + this.state._id)
		.then(res => res.json())
		.then(json => this.setState({user: json}));
		
		fetch('/api/account/verify?token='+this.state._id)
		       .then(res => res.json())
		       .then(json => {
				if(!json.success){
					this.disableEditBut();
				}
		       });
	}
	
	componentWillMount()// once
	{
		const { match: {params}} = this.props;
		this.setState({_id:params._id});
	}
	
	//edit functions
	toggleEditMode()
	{
		if (this.state.editMode)
			this.setState({editMode: false});
		else
			this.setState({
				editMode: true, 
				eFName: this.state.user[0].firstName,
				eLName: this.state.user[0].lastName,
				eEmail: this.state.user[0].email,
				eID: this.state.user[0].id
			});
	}
	
	bEditSubmit = ()=>{
		editSubmit(
			this.state._id,
			this.state.eFName,
			this.state.eLName,
			this.state.eEmail,
			this.state.eID,
			this.state.ePass,
			this.state.eNewPass
		);
	}
	
	disableEditBut = ()=>{
		this.setState({editButton:"hidden"});
	}
	
	//change handlers
	fNameChange = (e)=>{
		this.setState({eFName: e.target.value});
	}
	lNameChange = (e)=>{
		this.setState({eLName:e.target.value});
	}
	emailChange = (e)=>{
		this.setState({eEmail:e.target.value});
	}
	idChange = (e)=>{
		this.setState({eID:e.target.value});
	}
	passChange = (e)=>{
		this.setState({ePass:e.target.value});
	}
	newPassChange = (e)=>{
		this.setState({eNewPass:e.target.value});
	}
	
	//render function
	render() {
		const jsonPro = this.state.user[0];
		if (jsonPro)
		{			
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
											first name: <input onChange={this.fNameChange} className="shorten" id="upFName" type="text" defaultValue={jsonPro.firstName}/><br/>
											last name: <input onChange={this.lNameChange} className="shorten" id="upLName" type="text" defaultValue={jsonPro.lastName}/><br/>
											<div className="row profileSpecificDetails">
												<div className="col-md-12">
													Email:
													<input onChange={this.emailChange} className="shorten" type="email" defaultValue={email}/>
												</div>
												<div className="col-md-12">
													ID:
													<input onChange={this.idChange} className="shorten" type="text" defaultValue={idNum}/>
												</div>
												<div className="col-md-12">
													Current password: 
													<input onChange={this.passChange} className="shorten" type="password"/>
												</div>
												<div className="col-md-12">
													New password: 
													<input onChange={this.newPassChange} className="shorten" type="password" placeholder="leave blank for no change"/>
												</div>
												<div className="col-md-12">
												Security:
													<h6 className="profileValue">Level {secLvl}</h6>
												</div>
											</div>
											<input onClick={this.bEditSubmit} className="btn btn-primary" type="button" value="update"/>
										</form>
										<input type={this.state.editButton} value="cancel" id="startEdit" onClick={this.toggleEditMode.bind(this)} className="btn btn-primary" />
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
				const vouchPath = "/vouching/" + this.state._id;
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

										<input type={this.state.editButton} value="edit profile" id="startEdit" onClick={this.toggleEditMode.bind(this)} className="btn btn-primary" />

										<Link to={vouchPath}>
											<div className="profile-vouch">
												< VouchAverage _id={this.state._id}/>
											</div>
										</Link>
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
		}
		else
			return (<h1>Profile not found</h1>);
	}
}

export default Profile;
