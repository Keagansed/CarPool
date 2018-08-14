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
* Purpose: Validate whether all of the fields are valid - true if there are errors
*/
function validate(name, lastName) {
    return {
        name: name.length === 0,
        lastName: lastName.length === 0,
    };
}

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
            lastName: "",

            touched: {
                name: false,
                lastName: false,
            },
        };
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
        this.setState({name: e.target.value});
    }

    /*
    * Purpose: Sets the 'state.lastName' variable to senders current value
    */
    handleLastNameChange(e) {
        this.setState({lastName: e.target.value});
    }

    /*
    * Purpose: Give fields that have been entered incorrectly red borders
    */
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
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
                this.toggle();
            }
            else {
                this.setState({name: "", lastName: ""});
            }
        });
    }
  
    render() {
        /*
        * Purpose: Only give fields red borders if the user has changed/access them
        * and they are still not valid.
        */
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            return hasError ? shouldShow : false;
        };
        const errors = validate(this.state.name, this.state.lastName);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

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
                                <input 
                                    onChange={this.handleNameChange.bind(this)} 
                                    type="text" 
                                    className={(shouldMarkError('name') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput"} 
                                    placeholder="First Name" 
                                    id="changeFirstName"
                                    onBlur={this.handleBlur('name')}
                                /> 
                            </div>
                            <div className="row">
                                <input 
                                    onChange={this.handleLastNameChange.bind(this)} 
                                    type="text" 
                                    className={(shouldMarkError('lastName') ? "error" : "") + " form-control mx-auto width-15rem brad-2rem mbottom-1rem txt-purple settingInput"}
                                    placeholder="Last Name"
                                    id="changeLastName"
                                    onBlur={this.handleBlur('lastName')}
                                /> 
                            </div>
                            <div className="row">
                                <button disabled={isDisabled} onClick={this.changeName.bind(this)} type="submit" className="btn btn-primary mx-auto width-15rem brad-2rem bg-aqua txt-purple fw-bold" id="btnChangeName">
                                    Submit
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