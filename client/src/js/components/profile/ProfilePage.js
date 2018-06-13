import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import React, { Component } from 'react';

import "./../../utils/fileQuery.js";
import LoginStore from './../../stores/LoginStore';
import Search from './../Search.js';
import VouchAverage from "./../vouching/VouchAverage";
import VouchList from './../vouching/VouchList';
import Navbar from './../navbar/Navbar'
import { getFromStorage } from './../../utils/localStorage.js';

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
		
		const obj = getFromStorage('sessionKey');
        if(obj && obj.token){
            const { token } = obj;
            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    this.props.store.token = token;

                    this.setState({
                        loading: false,
                    })
                }
            })
        }
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
		const profilePicture = "./../api/account/getImage?filename=" + profilePic;
		const vouchPath = "/vouching/" + this.state._id;

		if (this.props.store.profileFound)
		{
			const token = this.state._id;
			return(
				<div className="size-100 bg-purple">
                    <div className="padbot-50px">
						Profile page will come here
                    </div>
                    <Navbar token={token}/>
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
