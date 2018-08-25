// File Type: Component

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

/**
 * Purpose: An interface to allow the user to delete a route they have
 */
class DeleteRoute extends Component{
    constructor(props) {
        super(props);
  
        this.state = {
            toggle: false,
            redirect: false,
        }

    }
  
    toggle = (event)=> {
        this.setState(prevState => ( {
            toggle: !prevState.toggle
        }));
    }

    delete = () => {
        fetch('/api/system/route/deleteRoute?token=' + this.props.token + '&routeId=' + this.props.routeId, {
            method:'GET',
        })
            .then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=> {

                if(json.success) {
                    alert('Route deleted');
                }else{
                    alert(json.message);
                }

            });
        this.setRedirect();
        this.toggle();
    }

    setRedirect = () => {
        this.setState({redirect: true});
    }

    renderRedirect = () => {
        if (this.state.redirect){
            return(<Redirect to='/HomePage' />);
        }
    }

    render(){
        let modal = [];
        modal.push(
            // Modal
            <div key="0" className="modal" tabIndex="-1" role="dialog" id="myModal" style={this.state.toggle ? display : hide}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-aqua">
                            <h5 className="modal-title fw-bold">Delete Route</h5>
                            <button type="button" className="close" onClick={this.toggle} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <h6 className="fw-bold mx-auto">Are you sure you want to delete this route?</h6>
                            </div>
                            <div className="row">
                                <button type="submit" onClick={this.delete} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnYesCancel">
                                    Yes
                                </button>
                                <button type="submit" onClick={this.toggle} className="col-5 btn btn-primary mx-auto width-15rem brad-2rem mbottom-0 bg-aqua txt-purple fw-bold" id="btnNoCancel">
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return(
            <div className="col-2 txt-center">
                <button className="p-0 btn height-100p bg-trans txt-purple fw-bold brad-0 font-20px"  onClick={this.toggle}>
                    <i className="fa fa-trash"></i>
                </button>
                { modal }
                {this.renderRedirect()}
            </div>
        );
    }
}

export default DeleteRoute;