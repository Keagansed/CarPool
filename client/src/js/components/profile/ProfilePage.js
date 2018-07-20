import { observer } from "mobx-react";
import React, { Component } from 'react';

// import "./../../utils/fileQuery.js";
import LoginStore from './../../stores/LoginStore';
import Vouches from './vouchesPage/Vouches';
import Trusts from './trustPage/Trusts';
import VouchAverage from "./../vouching/VouchAverage";
import Navbar from './../navbar/Navbar';
import NavTabs from './NavTabs';
import { getFromStorage } from './../../utils/localStorage.js';

@observer class ProfilePage extends Component {
	constructor()
	{
		super();
		//========= Properties ===========
		this.state = {
			_id:""
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
	
	setTab = () => {
        const { store } = this.props;

        if(!this.state.loading)
        {
            if(store.vouchTab === true)
            {
                return <Vouches _id={this.state._id}/>;
            }
            else if(store.trustTab === true)
            {
                return <Trusts/>;
            }
        }

    }
	
	//render function
	render() {
		const { firstName, lastName, profilePic, secLvl } = this.props.store;
		const profilePicture = "./../api/account/getImage?filename=" + profilePic;

		if (this.props.store.profileFound)
		{
			const token = this.state._id;
			return(
				<div className="size-100 bg-purple">
					<div className="container-fluid fixed-top bg-purple">
						<div className="row height-150px bg-purple">
							<img src={profilePicture} id="profilePic" className="mx-auto my-auto rounded-circle bord-5px-white" height="120" width="120" alt="s" />
						</div>
						<div className="row height-40px bg-purple">
							<h4 className="mx-auto my-auto txt-white mbottom-0">{firstName} {lastName}</h4>
						</div>
						<div className="row height-60px bg-purple padbot-10px">
								<div className="col-6 bordright-1px-white my-auto">
									<div className="col-12 txt-center txt-white">
										<h6 className="mbottom-0"><VouchAverage _id={this.state._id}/> <i className="fa fa-star txt-gold txt-15px"></i></h6>
									</div>
									<div className="col-12 txt-center txt-white">
										<h6>Vouch Average</h6>
									</div>
								</div>
								<div className="col-6 bordleft-1px-white my-auto">
									<div className="col-12 txt-center txt-white">
										<h6 className="mbottom-0">{secLvl}/5</h6>
									</div>
									<div className="col-12 txt-center txt-white">
										<h6>Trust Rating</h6>
									</div>
								</div>
						</div>
						<div className="row">
							<NavTabs store={this.props.store} token={token}/>
						</div>
					</div>
                    <div className="padtop-300px padbot-50px">
						{this.setTab()}
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
