import React, { Component } from 'react';
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
									<input type="submit" value="submit" id="upProPic" />
								</form>
							</div>
							<div className="col-md-7">
								<h3>{name}</h3>
								<h4>Level {secLvl}</h4>
								<h4>email: {email}</h4>
								<h4>ID number: {idNum}</h4>
							</div>
							<button id="logOutSubmit">logout</button>
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
