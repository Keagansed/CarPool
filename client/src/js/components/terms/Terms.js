// File Type: Component

import { observer } from "mobx-react";
import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

/*
 * Purpose: modal component that provides an interface for a user to suggest a new trip for the carpool members
 */
@observer class TermsDialog extends Component {
    /*
     * Purpose: calls the constructor of the parent class and initializes the fields. 'toggle' is the visibility of the modal.
     * 'user' contains all the users.
     */
    constructor(props) {
        super(props);

        this.state = {
            tripDialog: false,
        };
    }

    //Open/close trip dialog
    openTermsDialog = () => {
        this.setState({ tripDialog: true });
    };
    closeTermsDialog = () => {
        this.setState({ tripDialog: false });
    };

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {

        return (
            <div>
                <Typography variant='caption' color='primary' align='center' onClick={this.openTermsDialog}>Terms of Service</Typography>
                <Dialog open={this.state.tripDialog} onClose={this.closeTermsDialog} scroll='paper'>
                    <DialogTitle>Terms of Service</DialogTitle>
                    <DialogContent>
                        <DialogContentText paragraph>
                            The providers ("we", "us", "our") of the service provided by this web site ("Service") are not 
                            responsible for any user-generated content and accounts.
                        </DialogContentText>
                        <DialogContentText paragraph>
                            All content you submit, upload, or otherwise make available to the Service ("Content") may be 
                            reviewed by staff members. All Content you submit or upload may be sent to third-party 
                            verification services (including, but not limited to, spam prevention services). Do not submit 
                            any Content that you consider to be private or confidential.
                        </DialogContentText>
                        <DialogContentText paragraph>
                            You agree to not use the Service to submit or link to any Content which is defamatory, abusive, 
                            hateful, threatening, spam or spam-like, likely to offend, contains adult or objectionable content, 
                            contains personal information of others, risks copyright infringement, encourages unlawful 
                            activity, or otherwise violates any laws. You are entirely responsible for the content of, and 
                            any harm resulting from, that Content or your conduct.
                        </DialogContentText>
                        <DialogContentText paragraph>
                            We may remove or modify any Content submitted at any time, with or without cause, with or without 
                            notice. Requests for Content to be removed or modified will be undertaken only at our discretion. 
                            We may terminate your access to all or any part of the Service at any time, with or without cause, 
                            with or without notice.
                        </DialogContentText>
                        <DialogContentText paragraph>
                            These terms may be changed at any time without notice.
                        </DialogContentText>
                        <DialogContentText paragraph>
                            This application is a proof of concept. We are not responsible for anything that may negatively 
                            affect your well-being. Use at your own risk.
                        </DialogContentText>
                        <DialogContentText>
                            If you do not agree with these terms, please do not register or use the Service. Use of the Service 
                            constitutes acceptance of these terms. If you wish to close your account, please contact us.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeTermsDialog}  color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TermsDialog;