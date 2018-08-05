// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';

import Navbar from '../components/navigation/Navbar';
import NavTabs from '../components/profile/NavTabs';
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
			_id:""
		};
	}
	
	componentDidMount() {

	}
	
	/*
    * Purpose: Verifies the users token before component mounting to make sure the user is authorised
    */
	componentWillMount() {
		const { match: {params}} = this.props;

		this.setState({
			_id: params._id,
		})

		this.props.store.getProfile(params._id);
	}
	
	/*
    * Purpose: Changes the component rendered based on which tab from NavTabs has been selected
    */
	setTab = () => {
        const { store } = this.props;

        if(!this.state.loading) {
            if(store.vouchTab === true) {
                return <Vouches _id={this.state._id}/>;
            }
            else if(store.trustTab === true) {
                return <Trusts/>;
            }
        }

    }
	
	render() {
		const { firstName, lastName, profilePic, secLvl } = this.props.store;
		const profilePicture = "./../api/account/getImage?filename=" + profilePic;
		
		if (this.props.store.profileFound) {
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
							<NavTabs store={this.props.store} token={token}/>
						</div>
					</div>
                    <div className="padtop-300px padbot-50px">
						{this.setTab()}
					</div>
                    <Navbar token={token}/>
            	</div>
			);
		}else {
			return (
				<div>
					<h1>LOADING</h1>
				</div>
			);
		}
	}
}

export default ProfilePage;
