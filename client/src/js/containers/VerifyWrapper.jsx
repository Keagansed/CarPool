//Higher order component, used to wrap around components to redirect user if their session token is invalid
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { getFromStorage } from '../utils/localStorage.js';
import LoginStore from '../stores/LoginStore';
import ServerURL from '../utils/server';

export default function VerifyWrapper(ComponentToProtect) {
    return class extends Component {

        constructor() {
            super();

            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            const obj = getFromStorage('sessionKey');

            if (obj && obj.token) {
                const { token } = obj;

                fetch(ServerURL + '/api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json) {
                        if(json.success) {
                            this.setState({ loading: false });
                        }else{
                            this.setState({ loading: false, redirect: true });
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
            const { loading, redirect } = this.state;
            let view;
            if (!loading) {
                if (redirect) {
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