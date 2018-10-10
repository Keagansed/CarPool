import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        paddingTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    img: {
        width: "250px",
        marginTop: -50,
    }
});

class Slide extends React.Component {
    constructor(){
        super();

        this.state=({

        });
    }   

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}> 
                    <Paper className={classes.paper} style={{ padding: 0 }}>
                        <img src={this.props.image} alt="" className={classes.img}/>
                        <Typography variant="title" style={{ paddingBottom: 5 }}>
                            {this.props.title}
                        </Typography>
                        <Typography variant="subheading" style={{ paddingTop: 7 }} align="center">
                            {this.props.caption}
                        </Typography>
                    </Paper>
                </main>     
            </React.Fragment>
        );
    } 
}

export default withStyles(styles)(Slide);