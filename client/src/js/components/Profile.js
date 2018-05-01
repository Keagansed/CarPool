import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import "../utils/fileQuery.js";
import LoginStore from '../stores/LoginStore'
import { editSubmit } from "../utils/editProfileQuery.js";
import Search from './Search.js';
import VouchAverage from "./vouching/VouchAverage"

@observer class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
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
		fetch('/api/account/verify?token='+this.props.match.params._id)
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

		this.setState({
			_id: params._id,
		})

		this.props.store.getProfile(params._id);		
	}

	toggleEditMode()
	{
		if (this.state.editMode)
			this.setState({editMode: false});
		else
			this.setState({
				editMode: true, 
				eFName: this.props.store.firstName,
				eLName: this.props.store.lastName,
				eEmail: this.props.store.email,
				eID: this.props.store.id
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

	handleLogout = () =>
	{
		LoginStore.setLoggedIn(false);
		LoginStore.setToken('');
	}
	
	//render function
	render() {
		if (this.props.store.profileFound)
		{

			const { firstName, lastName, profilePic, secLvl, email, idNum } = this.props.store;

			const profilePicture = "../api/account/getImage/profilePicture?filename=" + profilePic;

			if(this.state.editMode)
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
										<img src={profilePicture} id="profilePic" className="profilePic" alt="Profile Pic" />
										<form action="/api/account/uploadFile" method="POST" encType="multipart/form-data">
											<input type="hidden" id="userId" name="id" defaultValue={this.state._id} />
											<input type="file" name="file" id="file"/>
											<input type="submit" value="submit" id="upProPic" className="btn btn-secondary"/>
										</form>
									</div>
									<div className="col-md-5 col-sm-7 profileUserDetails">
										<form method="POST" action="/api/account/updateProfile" id="upProInfo">
											first name: <input onChange={this.fNameChange} className="shorten" id="upFName" type="text" defaultValue={firstName}/><br/>
											last name: <input onChange={this.lNameChange} className="shorten" id="upLName" type="text" defaultValue={lastName}/><br/>
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
						<div className="center_container profile_center_container bubble">
							<div className="row full_row">
								<div className="col-md-7 col-sm-12 img-wrap">
									<img src={profilePicture} className="profilePic" alt="Profile Pic" />
								</div>
								<div className="col-md-5 col-sm-7 profileUserDetails">
									<h3 className="profileUserName">{firstName + " " + lastName}</h3>
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
												<VouchAverage _id={this.state._id}/>
											</div>
										</Link>

										<Link to="/">
											<button onClick={this.handleLogout} id="logOutSubmit" className="btn btn-primary">Logout</button>
										</Link>

									</div>

									
								</div>
							</div>
						</div> 
				)
			}
		}
		else
		{
			return (
				<div>
					<h1>LOADING</h1>
				</div>
			);
		}
	}
}

export default Profile;
