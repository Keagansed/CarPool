import { observer } from "mobx-react";
import React, { Component } from 'react';

import  "../../css/components/Spinner.css"

import DetailsTab from './profilepage/DetailsTab';
import { getFromStorage } from '../utils/localStorage.js';
import LoginStore from '../stores/LoginStore';
import Navbar from './Navbar'
import ProfileHeader from './profilepage/ProfileHeader';
import ProfileTabs from "./profilepage/ProfileTabs";
import TripsTab from './profilepage/TripsTab';
import VouchesTab from './profilepage/VouchesTab';


@observer class ProfilePage extends Component {
	constructor()
	{
		super();
		//========= Properties ===========
		this.state = {
		};
	}
	
	componentDidMount()//every load
	{

	}
	
	componentWillMount()// once
	{
		const obj = getFromStorage('sessionKey');
		if(obj && obj.token)
		{
			const { token } = obj;

            fetch('/api/account/verify?token='+token)
            .then(res => res.json())
            .then(json => {
                if(json.success){
					this.props.store.getProfile(token);
                }
            })
        }
	}

	handleLogout = () =>
	{
		LoginStore.setLoggedIn(false);
		LoginStore.setToken('');
		LoginStore.logOut();
	}

	
	setTab = () =>
	{
		const { store } = this.props;

		if(store.profileFound === true)
		{
			if(store.tripsTab === true)
			{
				return <TripsTab store={store}/>;
			}
			else if(store.vouchesTab === true)
			{
				return <VouchesTab store={store}/>;
			}
			else if(store.detailsTab === true)
			{
				return <DetailsTab store={store}/>;
			}
		}
		else
        {
            return(
                <div>
					<div className="spinner">
						<div className="double-bounce1"></div>
						<div className="double-bounce2"></div>
					</div>
				</div>
            )
        }
	}
	
	//render function
	render()
	{
		const { store } = this.props;

		return(
			<div className="wrapper">
				<div className="m-0 p-0 h-35">
					<div className="p-0 m-0 container-fluid">
						<div className="row m-0">

							<ProfileHeader store={store}/>

							<div className="col-md-12 p-0">
								
								<ProfileTabs store={store} />

								<div className="tab-content">
									<div className="tab-pane show active">
										{this.setTab()}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Navbar/>
			</div>
		);
		

	}
}

export default ProfilePage;
