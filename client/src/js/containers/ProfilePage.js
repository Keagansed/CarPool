// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import Navbar from '../components/navigation/Navbar';
import { ProfileNavTabs } from '../components/navigation/NavTabs';
import Trusts from '../components/profile/Trusts';
import Vouches from '../components/vouching/Vouches';
import VouchAverage from "../components/vouching/VouchAverage";

import { getFromStorage } from '../utils/localStorage.js';

/*
* Purpose: Container compenent for the user ProfilePage, only takes care of tab switching all data
* is in sub-components
*/
@observer class ProfilePage extends Component {
	constructor() {
		super();
	
		this.state = {
			token: ""
		};
	}

	componentWillMount() {
		let obj = getFromStorage('sessionKey');
		let token;
		
		if(obj) {
			token = obj.token;
		}

		this.setState({
			token,
		})

		this.props.store.getProfile(token);
	}
	
	/*
    * Purpose: Changes the component rendered based on which tab from NavTabs has been selected
    */
	setTab = () => {
        const { store } = this.props;

		if(store.vouchTab === true) {
			return <Vouches _id={this.state.token}/>;
		}
		else if(store.trustTab === true) {
			return <Trusts/>;
		}
	}
	
	renderProfile = () => {
		if (this.props.store.profileFound) {			
			const { firstName, lastName, profilePic, secLvl } = this.props.store;
			const profilePicture = "./../api/account/getImage?filename=" + profilePic;
			const token = this.state.token;

			return (
				<div>
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
										<h6 className="mbottom-0"><VouchAverage _id={token}/> 
											<i className="fa fa-star txt-gold txt-15px"></i>
										</h6>
									</div>
									<div className="col-12 txt-center txt-white">
										<h6>
											Vouch Average
										</h6>
									</div>
								</div>
								<div className="col-6 bordleft-1px-white my-auto">
									<div className="col-12 txt-center txt-white">
										<h6 className="mbottom-0">
											{secLvl}/5
										</h6>
									</div>
									<div className="col-12 txt-center txt-white">
										<h6>
											Trust Rating
										</h6>
									</div>
								</div>
						</div>
						<div className="row">
							<ProfileNavTabs store={this.props.store} token={token}/>
						</div>
					</div>
					<div className="padtop-300px padbot-50px">
						{this.setTab()}
					</div>
				</div>		
			);
		} else {
			return (
				<div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
			);
		}
	}
	
	render() {
		const token = this.state.token;

		return(
			<div className="size-100 bg-purple">
				{this.renderProfile()}
				<Navbar token={token}/>
			</div>
		);	
	}
}

export default ProfilePage;
