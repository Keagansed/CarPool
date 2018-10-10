// File Type: Component

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CarIcon from '@material-ui/icons/DirectionsCar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, DialogContentText } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import logo from "../../css/images/logo.png";
import communityImage from "../../css/images/CommunityImage.jpeg";
import moneyImage from "../../css/images/MoneyImage.jpeg";
import commuteImage from "../../css/images/CommuteImage.jpeg";
import roadImage from "../../css/images/RoadImage.jpeg";
import ios1 from "../../css/images/ios1.JPG";
import ios2 from "../../css/images/ios2.JPG";
import android1 from "../../css/images/android1.jpg";
import android2 from "../../css/images/android2.jpg";

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 4}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 4}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
    carpoolLogo: {
        width: 252,
        height: 252,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: theme.spacing.unit * 1,
    },
    dialogImg: {
        width: "100%",
        marginTop: 7,
        marginBottom: 7,
        border: "white solid 1px",
        justify: "center"
    }
});

/*
* Purpose: Landing page compenent is the first page the user sees when opening the app
*/
class InfoPage extends Component {
    constructor() {
        super();

        this.state = {
            openDialog: false,
        }
    }

    closeDialog = () => {
        this.setState({
            openDialog: false,
        })
    }

    openDialog = () => {
        this.setState({
            openDialog: true,
        })
    }
    
    renderDownloadDialog = () => {
        const { classes } = this.props;

        return (
            <Dialog
                open={this.state.openDialog}
                onClose={this.closeDialog}
                maxWidth="lg"   
                scroll='paper' 
            >
                <DialogTitle>Download App</DialogTitle>
                <DialogContent style={{ justifyContent: "center" }}>
                    <DialogContentText variant="title">
                        Android
                    </DialogContentText>

                    <img src={android1} alt="" className={classes.dialogImg}/>
                    <img src={android2} alt="" className={classes.dialogImg}/>

                    <DialogContentText variant="title">
                        iOS
                    </DialogContentText>

                    <img src={ios1} alt="" className={classes.dialogImg}/>
                    <img src={ios2} alt="" className={classes.dialogImg}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.renderDownloadDialog()}
                <CssBaseline />
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <CarIcon className={classes.icon} />
                        <Typography variant="title" color="inherit" noWrap>
                            The Iminsys Carpool Platform
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    {/* Hero unit */}
                    <div className={classes.heroUnit}>
                        <div className={classes.heroContent}>
                            <Avatar src={logo} align='center' className={classes.carpoolLogo} />
                            <Typography variant="title" align="center" color="textSecondary">
                                Welcome to the ridesharing platform that helps you help eachother.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={16} justify="center">
                                    <Grid item>
                                        <Button href={`/Landing`} variant="contained" color="primary">
                                            Get Started
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary" disabled>
                                            Watch Video
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={16} justify="center" style={{ marginTop: 16, marginBottom: -35 }} onClick={this.openDialog}>
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Download
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(classes.layout, classes.cardGrid)}>
                        {/* End hero unit */}
                        <Grid container spacing={40}>
                            <Grid item sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={communityImage}
                                        title="Community"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Join a Community
                                        </Typography>
                                        <Typography>
                                            The intention of the Iminsys Carpool Platform is to bring commuters together and to
                                            help them help eachother. By giving users the tools to find others who travel along
                                            similar routes, interact with them, and share driving responsibilities with no costs involved,
                                            the platform exposes the good in people and creates a network out of which everyone benefits.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={moneyImage}
                                        title="Money"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Save on Travel
                                        </Typography>
                                        <Typography>
                                            Unfortunately, travel is expensive. This is something that we are all familiar with
                                            and it is not a problem that is going away anytime soon. Our Carpool Platform does
                                            not provide for the exchange of money; however, it does allow people to alternate driving
                                            responsibilities so the costs involved in driving are reduced for everyone.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={commuteImage}
                                        title="Commute"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Enjoy Commuting
                                        </Typography>
                                        <Typography>
                                            Driving the same route on a daily basis is a tedious task but when you're driving with new
                                            friends it will become something you look forward to. Our Carpool
                                            Platform makes numerous provisions to ensure you only travel with people you feel comfortable
                                            around, so the only question that remains is - why drive alone when you can drive together?
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={roadImage}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="headline" component="h2">
                                            Clean our Roads
                                        </Typography>
                                        <Typography>
                                            If you've ever had to sit in peak hour traffic you'll know what a pain it can be. A big reason 
                                            for unnecessary traffic is that there are too many cars with one driver and
                                            a host of empty seats. By driving together, we are reducing the number cars on our roads, not only
                                            minimizing traffic, but minimizing the environmental impact our vehicles have.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="title" align="center" gutterBottom>
                        Created By
                    </Typography>
                    <Typography variant="subheading" align="center" color="textSecondary" component="p">
                        The Brogrammers Development Team
                    </Typography>
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }
}

InfoPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoPage);