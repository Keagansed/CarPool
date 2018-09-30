// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import Icon from '@material-ui/core/Icon';

import Navbar from '../components/navigation/Navbar';
import { ProfileNavTabs } from '../components/navigation/NavTabs';
import Trusts from '../components/profile/Trusts';
import Vouches from '../components/vouching/Vouches';
import VouchAverage from "../components/vouching/VouchAverage";

import { getFromStorage } from '../utils/localStorage.js';
import ServerURL from '../utils/server';

//Define the spefic styles for this page
const styles = theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
			width: 900,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	heroContent: {
		padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
	},
	avatar: {
		width: 200,
		height: 200,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: `${theme.spacing.unit * 1}px`,
	},
	button: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});

/*
* Purpose: Container compenent for the user ProfilePage, only takes care of tab switching all data
* is in sub-components
*/
@observer class ProfilePage extends Component {
	constructor() {
		super();

		this.state = {
			token: "",
			vouchesComponents: [],
		};
	}

	componentWillMount() {
		let obj = getFromStorage('sessionKey');
		let userId = this.props.match.params._id;
		let token;

		if (obj) {
			token = obj.token;
		}

		this.setState({
			token,
			vouchesComponents: [<Vouches key={userId} userId={userId} />]
		})


		this.props.store.getProfile(token, userId);
	}

	componentDidUpdate(prevProps) {

		if (this.props.match.params._id !== prevProps.match.params._id) {
			let userId = this.props.match.params._id;
			this.setState({
				vouchesComponents: [<Vouches key={userId} userId={userId} />]
			})
			this.props.store.getProfile(this.state.token, userId);
		}
	}

	/*
    * Purpose: Changes the component rendered based on which tab from NavTabs has been selected
    */
	setTab = () => {
		const { store } = this.props;

		if (store.vouchTab === true) {
			return this.state.vouchesComponents;
		}
		else if (store.trustTab === true) {
			return <Trusts store={this.props.store} />;
		}
	}

	renderProfile = () => {
		if (this.props.store.profileFound) {
			const { firstName, lastName, profilePic, secLvl } = this.props.store;
			const profilePicture = ServerURL + "/api/account/getImage?filename=" + profilePic;
			const token = this.state.token;

			return (
				<div>
					<div className="container-fluid fixed-top bg-purple">
						<div className="row height-150px bg-purple">
							<img
								src={profilePicture}
								id="profilePic"
								className="mx-auto my-auto rounded-circle bord-5px-white"
								height="120"
								width="120"
								alt="profilePic" />
						</div>
						<div className="row height-40px bg-purple">
							<h4 className="mx-auto my-auto txt-white mbottom-0">{firstName} {lastName}</h4>
						</div>
						<div className="row height-60px bg-purple padbot-10px">
							<div className="col-6 bordright-1px-white my-auto">
								<div className="col-12 txt-center txt-white">
									<h6 className="mbottom-0">
										<VouchAverage />
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
							<ProfileNavTabs store={this.props.store} token={token} />
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
		const { classes } = this.props;

		if (this.props.store.profileFound) {
			const { firstName, lastName, profilePic, secLvl } = this.props.store;
			const profilePicture = ServerURL + "/api/account/getImage?filename=" + profilePic;
			const token = this.state.token;

			return (
				<React.Fragment>
					<CssBaseline />
					<main className={classes.layout}>
						{/* Hero unit */}
						<div className={classes.heroContent}>
							<Avatar alt="Profile Picture" src={profilePicture} className={classes.avatar} />
							<Typography variant="title" align="center" color="textPrimary" component="p">
								{firstName} {lastName}
							</Typography>
							<Grid container spacing={24}>
								<Grid item xs={6} align="center">
									<Button align="center">
										<StarIcon style={{color: '#a2ad11'}}/><VouchAverage />
      								</Button>
									<Typography variant="caption" align="center" color="textSecondary">
										Vouch Average
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="caption" align="center" color="textSecondary">
										Trust Rating
									</Typography>
								</Grid>
							</Grid>
						</div>
					</main>
				</React.Fragment>
				// <div className="size-100 bg-purple">
				// 	{this.renderProfile()}
				// 	<Navbar token={token} />
				// </div>
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
}

ProfilePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage);