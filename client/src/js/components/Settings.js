import React, { Component } from 'react';
import { observer } from "mobx-react";
import LoginStore from '../stores/LoginStore';
import { Link } from 'react-router-dom';



@observer class Settings  extends Component {

    handleLogout = () =>
    {
        LoginStore.logOut();
    }

    render(){
        return(
            <div>
                <h1>Settings</h1>
                <Link to={"/"} onClick={this.handleLogout}>Log Out</Link> 
            </div>
        );
    }
}

export default Settings;