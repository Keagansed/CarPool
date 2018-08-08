// File Type: Component

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import app from '../../stores/MessagingStore'
import { getFromStorage } from '../../utils/localStorage.js'

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/*
 * Purpose: an interface that displays the members of the carpool and a link to their profile.
 */
class CarpoolInfoModal extends Component {

    /*
     * Purpose: call constructor of parent class and initializes the fields. 'state' contains 
     * the users that are in the carpool as well as a 'toggle' field which is a boolean 
     * that controls whether the modal is visible or not.
     */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.leaveCarpool = this.leaveCarpool.bind(this);
        this.users = app.database().ref().child('groupChats/'+this.props.carpoolID+"/users");

        this.state = {
            user:[],
            groupChatUsers:{},
            toggle: false
        };
    }

    /*
     * Purpose: acquires the users that are in the carpool and sets them to the state.
     */
    componentDidMount(){
        fetch('/api/account/profile/getAllUsers')
            .then(res => res.json())
            .then(json => this.setState({user: json}));
    }

    componentWillMount(){
        const previousUsers = this.state.groupChatUsers;

        this.users.on('child_added', snap =>{
            previousUsers[snap.key] = snap.val();
            this.setState({
                groupChatUsers: previousUsers
            });
        });
    }

    /*
     * Purpose: acquires the name of the user by iterating through the 'user' array in state
     * and matching the ID that is passed through to the function.
     */
    getUsername(_id) {

        for(let x in this.state.user) {

            if(this.state.user[x]._id === _id) {
                return this.state.user[x].firstName;
            }

        }

    }

    /*
     * Purpose: toggles whether the modal is visible or not by setting the 'toggle' field the 
     * opposite of the previous value. It called when the carpool name or the modal close button
     * is clicked.
     */
    toggle(event) {
        event.preventDefault();
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
     *Purpose: removes the user from the carpool and returns them to the homepage
     * It is called when the leave carpool button is clicked
     */
    leaveCarpool(){
        let tempUsers = {};
        for(let user in this.state.groupChatUsers){
            if(user !== getFromStorage('sessionKey').token){
                tempUsers[user] = this.state.groupChatUsers[user];
            }
        }

        this.setState({
            groupChatUsers: tempUsers
        }, function () {
            app.database().ref().child('groupChats/'+this.props.carpoolID)
                .update({users: this.state.groupChatUsers}).then(() => {
                return {};
            }).catch(error => {

                return {
                    errorCode: error.code,
                    errorMessage: error.message
                }

            });
        });

    }

    /*
     * Purpose: renders the component in the DOM. The visibility of the modal is dependant on the 'toggle' field.
     */
    render() {
        let users = [];

        for(let user in this.props.users) {
            users.push(
                <div className="row bordbot-1px-dash-grey" key={Math.random()}>
                    <div className="col-6 txt-left">{this.getUsername(user)}</div><div className="col-6 vertical-right"><Link to={"/ProfilePage/"+user}>View Profile</Link></div>
                </div>
            );
        }

        var modal = [];

        modal.push(
            // Modal
            <div key={Math.random()} className="modal" tabIndex="-1" role="dialog" id="carpoolInfoModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">{this.props.carpoolName}</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row bordbot-1px-dash-grey">
                                <h6 className="fw-bold mx-auto">Carpool Members</h6>
                            </div>  
                            {users}
                        </div>
                        <a href="/HomePage" onClick={this.leaveCarpool}>
                            Leave carpool
                        </a>
                    </div>
                </div>
            </div>
        );

        return(
            <div className="col-8 txt-center">
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px" onClick={this.toggle}>
                    {/* *** */}
                    {this.props.carpoolName}
                </button>
                {modal}
            </div>
        );
    }
}

export default CarpoolInfoModal;