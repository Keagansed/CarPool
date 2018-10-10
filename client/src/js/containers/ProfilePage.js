// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import SecurityIcon from '@material-ui/icons/VerifiedUser';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

import Trusts from '../components/profile/Trusts';
import Vouches from '../components/vouching/Vouches';
import VouchAverage from "../components/vouching/VouchAverage";
import VerifyWrapper from './VerifyWrapper';

import { getFromStorage } from '../utils/localStorage.js';
import ServerURL from '../utils/server';

//Container
function TabContainer({ children, dir }) {
	return (
		<Typography component="div" dir={dir} style={{ paddingTop: 292, paddingBottom: 56 }}>
			{children}
		</Typography>
	);
}
TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

//Define the spefic styles for this page
const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
	fixedTop: {
		width: '100%',
		position: 'fixed',
		top: 0,
		zIndex: 99,
	},
	heroContent: {
		padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
		backgroundColor: theme.palette.background.paper,
	},
	avatar: {
		width: 128,
		height: 128,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: `${theme.spacing.unit * 1}px`,
	},
	button: {
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	bottomNav: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		borderTop: '1px solid lightgrey',
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
			tabNum: 0,
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
			vouchesComponents: [<Vouches key={userId} userId={userId} />],
			tabNum: 0,
		});


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

	//Handle tab changes
	handleChange = (event, value) => {
		this.setState({
			tabNum: value,
		});
	};

	renderName = () => {
		if (this.props.store.profileFound) {
			const { firstName, lastName } = this.props.store;

			return (
				<React.Fragment>
					{firstName} {lastName}
				</React.Fragment>
			);

		} else {
			return (
				<React.Fragment></React.Fragment>
			);
		}
	}

	renderSecLvl = () => {
		if (this.props.store.profileFound) {
			return this.props.store.secLvl.toFixed(1)
		} else {
			return 0.0;
		}
	}

	renderVouchAverage = () => {
		if (this.props.store.profileFound) {
			return <VouchAverage />
		} else {
			return 0.0;
		}
	}

	renderNavContent = () => {
		if (this.props.store.profileFound) {
			return (
				<React.Fragment>
					{this.state.tabNum === 0 && <TabContainer>{this.state.vouchesComponents}</TabContainer>}
					{this.state.tabNum === 1 && <TabContainer><Trusts store={this.props.store} /></TabContainer>}
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<div className="spinner">
						<div className="double-bounce1"></div>
						<div className="double-bounce2"></div>
					</div>
				</React.Fragment>
			);
		}
	}

	render() {
		const { classes } = this.props;
		const { profilePic } = this.props.store;
		const profilePicture = ServerURL + "/api/account/getImage?filename=" + profilePic;

		return (
			<div className={classes.root}>
				<div className={classes.fixedTop}>
					{/* Hero unit - profile pic, name, and ratings */}
					<div className={classes.heroContent}>
						<Avatar alt="" src={profilePicture} className={classes.avatar} />
						<Typography variant="title" align="center" color="textPrimary">
							{this.renderName()}
						</Typography>
						<Grid container>
							<Grid item xs={6} align="center" style={{ paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
								<Button align="center" style={{ paddingBottom: 4 }}>
									<StarIcon style={{ color: 'gold' }}/>{this.renderVouchAverage()}/5
								</Button>
								<Typography variant="caption" align="center" color="textSecondary">
									Vouch Average
								</Typography>
							</Grid>
							<Grid item xs={6} align="center" style={{ paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }}>
								<Button align="center" style={{ paddingBottom: 4 }}>
									<SecurityIcon style={{ color: 'green' }} />{this.renderSecLvl()}/5
								</Button>
								<Typography variant="caption" align="center" color="textSecondary">
									Security Rating
								</Typography>
							</Grid>
						</Grid>
					</div>
					{/* Nav bar for vouches and trust */}
					<AppBar position="static">
						<Tabs value={this.state.tabNum} onChange={this.handleChange} fullWidth>
							<Tab label="Vouches" />
							<Tab label="Trust" href="#basic-tabs" />
						</Tabs>
					</AppBar>
				</div>
				{/* Navbar content */}
				<div>
					{this.renderNavContent()}
				</div>
				{/* Bottom nabar */}
				<BottomNavigation
					value={0}
					className={classes.bottomNav}
				>
					<BottomNavigationAction
						label="Profile"
						icon={<UserIcon />}
						showLabel
					/>
					<BottomNavigationAction
						component={Link}
						to={"/HomePage"}
						label="Home"
						icon={<HomeIcon />}
						showLabel
					/>
					<BottomNavigationAction
						component={Link}
						to={`/Settings`}
						label="Settings"
						icon={<SettingsIcon />}
						showLabel
					/>
				</BottomNavigation>
			</div>
		);
	}
}

ProfilePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VerifyWrapper(ProfilePage));