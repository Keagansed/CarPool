import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import "../utils/fileQuery.js";
// import { disableEditBut } from "../utils/editProfile.js";
import VouchAverage from "./vouching/VouchAverage"
import Search from './Search.js';

@observer class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
			editMode: false
		};
	}
	
	goVouch(){
		this.props.history.push('/vouching/' + this.state._id);
	}
	
	componentDidMount()//every load
	{
		
	}
	
	componentWillMount()// once
	{
		const { match: {params}} = this.props;
	
		this.props.store.getProfile(params._id);		
	}

	toggleEditMode()
	{
		if (this.state.editMode)
			this.setState({editMode: false});
		else
			this.setState({editMode: true});
	}
	
	render() {
		if (this.props.store.profileFound)
		{

			// fetch('/api/account/verify?token='+this.state._id)
			// .then(res => res.json())
			// .then(json => {
			// if(!json.success){
			// 	disableEditBut();
			// }
			// });

			const { firstName, lastName, profilePic, secLvl, email, idNum } = this.props.store;

			const profilePicture = "../api/account/getImage/profilePicture?filename=" + profilePic;

			return (
				<div>
					<div>
						<Search />
					</div>
					<div>
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

									<button id="startEdit" onClick={this.toggleEditMode.bind(this)} className="btn btn-primary">edit profile</button>

									<div onClick={this.goVouch.bind(this)}>
										<div className="profile-vouch">
											< VouchAverage _id={this.props.match.params._id}/>
										</div>
									</div>
									{/* <div>
										<Redirect to={"/"}>
											<button id="logOutSubmit" className="btn btn-primary">logout</button>
										</Redirect>
									</div> */}

									<Link to="/">
										<button id="logOutSubmit" className="btn btn-primary">Logout</button>
									</Link>
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

				</div>
			);
		}
	}
}

export default Profile;
