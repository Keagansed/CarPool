// File Type: Component

import React, { Component } from 'react';

// Used as a css prop
const display = {
    display: 'block'
};
// Used as a css prop
const hide = {
    display: 'none'
};

/*
* Purpose: Popup modal that allows you to enter a new name for your account
*/
class EditNameModal extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
  
        this.state = {
            toggle: false,
            name: "",
            lastName: ""
        }
    }
  
    /*
    * Purpose: Toggles the 'state.toggle' variable between true and false
    */
    toggle(event) {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }

    /*
    * Purpose: Sets the 'state.name' variable to senders current value
    */
    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    /*
    * Purpose: Sets the 'state.lastName' variable to senders current value
    */
    handleLastNameChange(e) {
        this.setState({lastName: e.target.value})
    }

    /*
    * Purpose: API call to the backend that updates the users name + last name and returns whether or not
    * the update was successful
    */
    changeName(){
        fetch('/api/account/profile/updateName',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: this.props.token,
                name: this.state.name,
                lastName: this.state.lastName
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if (json.success) {
                alert("Name changed");
                this.toggle();
            }
            else {
                alert("Name was not changed " + json.message);
            }
        });
    }
  
    render() {
        var modal = [];

        modal.push(
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">
                                Edit Name
                            </h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <input onChange={this.handleNameChange.bind(this)} type="text" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput" placeholder="First Name" required="required" name="firstName" id="changeFirstName"/> 
                            </div>
                            <div className="row">
                                <input onChange={this.handleLastNameChange.bind(this)} type="text" className="form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput" placeholder="Last Name" required="required" name="lastName" id="changeLastName"/> 
                            </div>
                            <div className="row">
                                <button onClick={this.changeName.bind(this)} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem mbottom-1rem bg-aqua txt-purple fw-bold" id="btnChangeName">
                                    Submit Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="mx-auto">
                <div className="container-fluid bordbot-2px-white" onClick={this.toggle}>
                    <div className="row txt-white padver-10px">
                        <div className="col-9">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    Edit Name
                                </h5>
                            </div>
                        </div>
                        <div className="col-3 vertical-right">
                            <div className="col-12">
                                <h5 className="mbottom-0">
                                    <i className="fa fa-edit"/>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                {modal}
            </div>
        );
    }
}

export default EditNameModal;