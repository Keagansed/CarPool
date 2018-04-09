import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/App.css';

import "../utils/fileQuery.js";

class Profile extends Component {
	constructor()
	{
		super();
		this.state = {
			user:""
		};
	}
	
	componentDidMount()
	{
		fetch('/api/account/getProfile?_id=' + this.props._id)
		.then(res => res.json())
		.then(json => this.setState({user: json}));
	}
	
	render() {
		const jsonPro = this.state.user[0];
		if (jsonPro)
		{
			const userName = jsonPro.firstName;
			const name = jsonPro.firstName + " " + jsonPro.lastName;
			const profilePic = "./api/account/getImage?filename=" + jsonPro.profilePic;
			const secLvl = 1;
			const email = jsonPro.email;
			const idNum = jsonPro.id;
		
			return (
                <div className="center_container profile_center_container bubble">
                        <div className="row full_row">
                            <div className="col-md-7 col-xs-7 img-wrap">
                            <img src={profilePic} id="profilePic" alt="Profile Pic" />
                            </div>
                            <div className="col-md-5 col-xs-5 profileUserDetails">
                                <h3 className="profileUserName">{name}</h3>
                                <h6>Rating to be displayed here</h6>
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
			);
		}
		else
			return (<h1>Profile not found</h1>);
	}
}

export default Profile;
