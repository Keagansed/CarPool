import { observer } from "mobx-react";
import React, { Component } from 'react';

@observer class DetailsTab  extends Component 
{

    getFName = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.firstName;
    }

    getLName = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.lastName;
    }

    getEmail = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.email;
    }

    getID = () =>
    {
        if(this.props.store.profileFound)
            return this.props.store.idNum;
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

    bEditSubmit = (e) =>
	{
        e.preventDefault();

		const { store } = this.props;
		store.editSubmit();
    }
    
    
    uploadProfilePic = (event) =>
    {
		const { store } = this.props;

        const formData = new FormData();
        formData.append('id', store.token);
        formData.append('file', event.target.files[0]);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/profilePicture', true);
        xhr.onreadystatechange = res =>
        {            
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                store.getProfile(store.token);
                
            }
        }

		store.editMode = false;
        xhr.send(formData);  
	}


    render(){

        return(
            
            <div className="tab-pane px-2" id="tabthree" role="tabpanel">
                <form method="POST" action="" id="upProInfo">
                    <div className="row px-3 py-2 secondaryBorderBoddom">
                        <div className="col-md-6 col-6 p-0">
                            <h4 className="text-secondary m-0">
                                <b>First Name:</b>
                            </h4>
                        </div>
                        <div className="col-md-6 col-6 p-0 textRight">
                            <p className="text-secondary m-0">
                                <input onChange={this.fNameChange} className="shorten" id="upFName" type="text" defaultValue={this.getFName()}/>
                            </p>
                        </div>
                    </div>
                    <div className="row px-3 py-2 secondaryBorderBoddom">
                        <div className="col-md-6 col-6 p-0">
                            <h4 className="text-secondary m-0">
                                <b>Last Name:</b>
                            </h4>
                        </div>
                        <div className="col-md-6 col-6 p-0 textRight">
                            <p className="text-secondary m-0">
                                <input onChange={this.lNameChange} className="shorten" id="upLName" type="text" defaultValue={this.getLName()}/>
                            </p>
                        </div>
                    </div>
                    <div className="row px-3 py-2 secondaryBorderBoddom">
                        <div className="col-md-6 col-6 p-0">
                            <h4 className="text-secondary m-0">
                                <b>Email:</b>
                            </h4>
                        </div>
                        <div className="col-md-6 col-6 p-0 textRight">
                            <p className="text-secondary m-0">
                                <input onChange={this.emailChange} className="shorten" type="email" defaultValue={this.getEmail()}/>
                            </p>
                        </div>
                    </div>
                    <div className="row px-3 py-2 secondaryBorderBoddom">
                        <div className="col-md-6 col-6 p-0">
                            <h4 className="text-secondary m-0">
                                <b>ID Number:</b>
                            </h4>
                        </div>
                        <div className="col-md-6 col-6 p-0 textRight">
                            <p className="text-secondary m-0">
                                <input onChange={this.idChange} className="shorten" type="text" defaultValue={this.getID()}/>
                            </p>
                        </div>
                    </div>
                    <div className="row px-3 py-2 secondaryBorderBoddom">
                        <div className="col-md-6 col-6 p-0">
                            <h4 className="text-secondary m-0">
                                <b>Current Password:</b>
                            </h4>
                        </div>
                        <div className="col-md-6 col-6 p-0 textRight">
                            <p className="text-secondary m-0">
                                <input onChange={this.passChange} className="shorten" type="password"/>
                            </p>
                        </div>
                    </div>
                    <div className="row px-3 py-2 secondaryBorderBoddom bg-white">
                        <div className="col-md-6 col-6 p-0">
                            <h4 className="text-secondary m-0">
                                <b>New Password:</b>
                            </h4>
                        </div>
                        <div className="col-md-6 col-6 p-0 textRight">
                            <p className="text-secondary m-0">
                                <input onChange={this.newPassChange} className="shorten" type="password" placeholder="Leave blank for no change"/>
                            </p>
                        </div>
                    </div>

                    <div className="row px-3 py-2 secondaryBorderBoddom bg-white">
                        <div className="col-md-6 col-6 p-0">
                            <h4 className="text-secondary m-0">
                                <b>Change Picture</b>
                            </h4>
                        </div>
                        <div className="col-md-6 col-6 p-0 textRight">
                            <p className="text-secondary m-0">
                                <input type="file" name="file" id="file" onChange={this.uploadProfilePic}/>
                            </p>
                        </div>
                    </div>

                    <div className="row px-3 py-3 bg-white">
                        <div className="col-md-12 col-12 p-0 textCenter">
                            <input onClick={this.bEditSubmit} className="btn btnDetailUpdate" type="button" value="Update"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default DetailsTab;