//Higher order component, used to wrap around components to redirect user if their session token is invalid
import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { getFromStorage } from '../utils/localStorage.js';
import LoginStore from '../stores/LoginStore';
import VerifyStore from '../stores/VerifyStore';
import ServerURL from '../utils/server';

@observer export default function VerifyWrapper(ComponentToProtect) {
    return  class extends Component {

        constructor() {
            super();
            // this.state = {
            //     loading: true,
            //     redirect: false,
            // };
        }

        componentDidMount() {
            const obj = getFromStorage('sessionKey');
            // VerifyStore.reset();
            // VerifyStore.redirect = false;


            if (obj && obj.token) {
                const { token } = obj;

                // VerifyStore.verify(token);
                fetch(ServerURL + '/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json) {
                        if(json.success) {
                            VerifyStore.loading = false;
                            // this.setState({ loading: false });
                        }else{
                            VerifyStore.loading = false;
                            VerifyStore.redirect = true;

                            // this.setState({ loading: false, redirect: true });
                        }
                    } else {
                    }
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ loading: false, redirect: true });
                });
            }
        }

        render() {            
            let view;
            if (!VerifyStore.loading) {
                if (VerifyStore.redirect) {
                    LoginStore.logOut();
                    view = <Redirect to="/Landing" />
                } else {
                    view = <ComponentToProtect {...this.props} />
                }
            }
            return (
                <React.Fragment>
                    { view }
                </React.Fragment>
                );
            }
        }
    }