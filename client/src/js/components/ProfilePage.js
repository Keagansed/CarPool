import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import React, { Component } from 'react';

import "../utils/fileQuery.js";
import LoginStore from '../stores/LoginStore';
import Search from './Search.js';
import VouchAverage from "./vouching/VouchAverage";
import VouchList from './vouching/VouchList';

import starFilled  from "./../../css/images/star-filled.png";
import starEmpty from "./../../css/images/star-empty.png";
import infoIcon from "./../../css/images/info-icon.png";

@observer class ProfilePage extends Component {
	constructor()
	{
		super();
		//========= Properties ===========
		this.state = {
			_id:"",
			editButton: "button",
		};
	}
	
	componentDidMount()//every load
	{
		this.props.store.getProfile(this.props.match.params._id);
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
		LoginStore.logOut();
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
		const { firstName, lastName, profilePic, secLvl, email, idNum } = this.props.store;
		const profilePicture = "../api/account/getImage?filename=" + profilePic;
		const vouchPath = "/vouching/" + this.state._id;

		if (this.props.store.profileFound)
		{
			return(
				<div className="wrapper">
				<div className="m-0 p-0 h-35">
					<div className="p-0 m-0 container-fluid">
						<div className="row m-0">
							<div className="col-md-12 col-12 profileHeader">
								<div className="row w-100 m-0 h-100 py-3">
									<div className="m-0 p-0 col-md-12" id="colHeaderImage">
										<img src={profilePicture} id="profilePic" className="d-block mx-auto rounded-circle border-white profilePic" height="120" width="120" alt="s" />
										<form encType="multipart/form-data" className="hidden">
											<input type="file" name="file" id="file" onChange={this.uploadProfilePic}/>
										</form>
									</div>
								<div className="p-0 col-md-12">
									<h5 className="text-white text-center m-0 p-1" id="headName">
										<b>{firstName} {lastName}</b>
									</h5>
								</div>
									<div className="py-2 col-md-12">
										<div className="row">
											<div className="col-4">
												<div className="row">
													<div className="col-12 text-center py-0">
														<p className="text-primary m-0 text-center" id="pRatingAvg">
																<Link to={vouchPath}>
																	<VouchAverage _id={this.state._id}/>
																</Link>
														</p>
													</div>
													<div className="col-12 py-0">
														<p className="text-white text-center m-0" id="pRatingLabel">Ratings</p>
													</div>
												</div>
											</div>
											<div className="thin-border-sides col-4 col-md-4">
												<p className="text-primary text-center m-0" id="pNumTrips">
													<font color="#140d4f" className="text-primary">0</font>
												</p>
												<p className="text-white text-center m-0" id="pNumTripsLabel">Trips</p>
											</div>
											<div className="col-4 col-md-4">
												<p className="text-primary text-center m-0" id="pTrust">
													<font color="#140d4f" className="text-primary">{secLvl}/5</font>
												</p>
												<p className="text-white text-center m-0" id="pTrustLabel">Trust</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-12 p-0">
							<ul className="nav nav-tabs bg-primary">
								<li className="nav-item w-3rd bg-info text-center px-0">
									<a href="" className="nav-link bg-info" data-toggle="tab" data-target="#tabone">
										<b>
											<b>Trips</b>
										</b>
									</a>
								</li>
								<li className="nav-item w-3rd text-center bg-info">
									<a className="nav-link active bg-info" data-target="#tabtwo" data-toggle="tab" href="">
										<b>
											<b>Vouches</b>
										</b>
									</a>
								</li>
								<li className="nav-item w-3rd text-center bg-info">
									<a className="nav-link bg-info" href="" data-target="#tabthree" data-toggle="tab">
										<b>
											<b>Details</b>
										</b>
									</a>
								</li>
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade" id="tabone" role="tabpanel">
									
								</div>
								<div className="tab-pane fade show active" id="tabtwo" role="tabpanel">
								<div className="list-group bg-info">
										<a href="#" className="list-group-item list-group-item-action flex-column align-items-start bg-info text-white m-0 py-1">
											<div className="row p-0">
												<div className="col-3 col-md-3 text-center p-0">
													<img className="d-block rounded-circle border-secondary mx-auto" src={profilePicture} id="imgProfilePic" width="80" height="80"/> 
												</div>
												<div className="col-6 col-md-6 px-2">
													<div className="row">
														<div className="col-md-12 col-12 p-0">
															<img className="d-block img-fluid d-inline-flex" src={starFilled} width="20" height="20"/>
															<img className="d-block img-fluid d-inline-flex mx-1" src={starFilled} width="20" height="20"/>
															<img className="d-block img-fluid d-inline-flex" src={starFilled} width="20" height="20"/>
															<img className="d-block img-fluid d-inline-flex mx-1" src={starFilled} width="20" height="20"/>
															<img className="d-block img-fluid d-inline-flex" src={starEmpty} width="20" height="20"/> 
														</div>
														<div className="col-md-12 col-12 p-0">
															<p className="text-secondary m-0">
																<b>Peter Parker</b>
															</p>
														</div>
														<div className="col-md-12 col-12 p-0">
															<p className="m-0 text-10 text-secondary">10/05/2018</p>
														</div>
														<div className="col-md-12 col-12 p-0">
															<p className="m-0 text-10 text-secondary">Pleasant company, he kept me entertained </p>
														</div>
													</div>
												</div>
												<div className="mr-auto col-3 col-md-3">
													<img className="d-block rounded-circle p-1 my-3 float-right" src={infoIcon} id="imgProfilePic" width="50" height="50"/> 
												</div>
											</div>
										</a>
									</div>
								</div>
								<div className="tab-pane fade" id="tabthree" role="tabpanel">
									<p className="">Tab pane three. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
								</div>
							</div>
						</div>
						<div className="col-md-12"></div>
							<div className="p-0 col-md-4 col-12">
								<ul className="nav nav-pills navbarBottom text-center">
									<li className="nav-item ml-auto w-25">
										<a href="#" className="nav-link no-hover">
											<i className="fa fa-cog fa-2x text-secondary d-inline"></i>&nbsp;
										</a>
									</li>
									<li className="nav-item w-25">
										<a className="nav-link no-hover" href="#">
											<i className="fa fa-fw fa-car fa-2x d-inline text-secondary"></i>
										</a>
									</li>
									<li className="nav-item mr-auto text-secondary w-25">
										<a href="#" className="nav-link no-hover">
											<i className="fa fa-fw fa-2x fa-user d-inline text-secondary"></i>
										</a>
									</li>
								</ul>
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
					<h1>LOADING</h1>
				</div>
			);
		}
	}
}

export default ProfilePage;
