//Higher order component, used to wrap around components to redirect user if their session token is invalid
import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { getFromStorage } from '../utils/localStorage.js';
import LoginStore from '../stores/LoginStore';
import VerifyStore from '../stores/VerifyStore';

@observer export default function VerifyWrapper(ComponentToProtect) {
    return  class extends Component {

        componentDidMount() {
            const obj = getFromStorage('sessionKey');

            if (obj && obj.token) {
                const { token } = obj;

                VerifyStore.verify(token);
            }
        }

        render() {            
            let view;
            if (!VerifyStore.loading) {
                if (VerifyStore.redirect) {
                    LoginStore.logOut();
                    view = <Redirect to="/Landing" />
                    VerifyStore.reset();
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