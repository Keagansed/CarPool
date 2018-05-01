import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import "../utils/fileQuery.js";
import LoginStore from '../stores/LoginStore'
import Search from './Search.js';
import VouchAverage from "./vouching/VouchAverage"

@observer class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
			_id:"",
			editButton: "button",
		};
	}
	
	componentDidMount()//every load
	{
		this.props.store.getProfile(this.props.match.params._id);
		// fetch('/api/account/verify?token='+this.props.match.params._id)
		// .then(res => res.json())
		// .then(json => {
		// 	console.log(json)
		// 	if(!json.success){
		// 		this.disableEditBut();
		// 	}
		// });
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
		const { store } = this.props;

		if(store.editMode)
		{
			store.editMode = false;
		}
		else
		{
			store.editMode = true;
			store.eFName = store.firstName;
			store.eLName = store.lastName;
			store.eEmail = store.email;
			store.eID = store.idNum;
		}
	}
	
	bEditSubmit = ()=>{
		const { store } = this.props;
		store.editSubmit();
	}
	
	disableEditBut = ()=>{
		this.setState({editButton:"hidden"});
	}
	
	//change handlers
	fNameChange = (e)=>{
		this.props.store.eFName = e.target.value;
	}
	lNameChange = (e)=>{
		this.props.store.eLName = e.target.value;
	}
	emailChange = (e)=>{
		this.props.store.eEmail = e.target.value;
	}
	idChange = (e)=>{
		this.props.store.eID = e.target.value;
	}
	passChange = (e)=>{
		this.props.store.ePass = e.target.value;
	}
	newPassChange = (e)=>{
		this.props.store.eNewPass = e.target.value;
	}

	handleLogout = () =>
	{
		LoginStore.setLoggedIn(false);
		LoginStore.setToken('');
	}

	uploadProfilePic = (event) =>
    {
		const { store } = this.props;

        const formData = new FormData();
        formData.append('id', this.props.match.params._id);
        formData.append('file', event.target.files[0]);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/profilePicture', true);
        xhr.onreadystatechange = res =>
        {            
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                store.getProfile(this.state._id);
            }
        }

		store.editMode = false;
        xhr.send(formData);  

    }
	
	//render function
	render() {
		const test =  false

		if (test)
		{

			const { firstName, lastName, profilePic, secLvl, email, idNum } = this.props.store;

			const profilePicture = "../api/account/getImage?filename=" + profilePic;

			if(this.props.store.editMode)
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
										<img src={profilePicture} id="profilePic" className="profilePic" alt="s" />
										<form encType="multipart/form-data">
											<input type="file" name="file" id="file" onChange={this.uploadProfilePic}/>
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

										
										<div className="profile-vouch">
											<Link to={vouchPath}>
												<VouchAverage _id={this.state._id}/>
											</Link>
										</div>										

										<div>
											<Link to={"/verification/" + this.state._id}><button id="verificationDocuments" className="btn btn-success">Verification Documents</button></Link>
										</div>

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
