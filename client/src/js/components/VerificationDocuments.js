import React, { Component } from 'react';

class VerificationDocuments extends Component {
    constructor(props)
    {
        super();

        this.state = {
            loading: "true",
            user: null,
            idDoc: '',
            drivers: '',
            car: '',
            carReg: ''
        }
    }

    componentWillMount()
    {
        this.fetchUser();
    }

    componentDidMount()
    {

    }

    fetchUser = () =>
    {
        fetch('/api/account/getProfile?_id=' + this.props.match.params._id)
		.then(res => res.json())
		.then(json => {           
            this.setState({
                user: json[0],                
                idDoc: json[0].IdDocument,
                drivers: json[0].driversLicense,
                car: json[0].CarPic,
                carReg: json[0].CarRegistration,
                loading: false
            })      
        });
    }

    uploadID = (event) =>
    {
        const formData = new FormData();
        formData.append('id', this.props.match.params._id);
        formData.append('file', event.target.files[0]);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/IdDocument', true);
        xhr.onreadystatechange = res =>
        {            
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                this.fetchUser();
            }
        }

        xhr.send(formData);  

    }

    uploadDrivers = (event) =>
    {
        const formData = new FormData();
        formData.append('id', this.props.match.params._id);
        formData.append('file', event.target.files[0]);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/driversLicense', true);
        xhr.onreadystatechange = res =>
        {            
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                this.fetchUser();
            }
        }

        xhr.send(formData);  
    }

    uploadCarPic = (event) =>
    {
        const formData = new FormData();
        formData.append('id', this.props.match.params._id);
        formData.append('file', event.target.files[0]);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/CarPic', true);
        xhr.onreadystatechange = res =>
        {            
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                this.fetchUser();
            }
        }

        xhr.send(formData);  
    }

    uploadCarRegistration = async (event) =>
    {
        const formData = new FormData();
        formData.append('id', this.props.match.params._id);
        formData.append('file', event.target.files[0]);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/account/uploadFile/CarRegistration', true);
        xhr.onreadystatechange = res =>
        {            
            if(xhr.readyState === XMLHttpRequest.DONE)
            {
                this.fetchUser();
            }
        }

        xhr.send(formData);  

    }

    getImage = (filename) =>
    {
        return "../api/account/getImage?filename=" + filename;
    }

	render(){	        

        if(this.state.loading === false)
        {   

            let IdPic = '';
            let driversPic = '';
            let carPic = '';
            let carRegPic = '';

            if(this.state.idDoc)
            {
                IdPic = this.getImage(this.state.idDoc);
            }
            if(this.state.drivers)
            {
                driversPic = this.getImage(this.state.drivers);
            }
            if(this.state.car)
            {
                carPic = this.getImage(this.state.car);
            }
            if(this.state.carReg)
            {
                carRegPic = this.getImage(this.state.carReg);
            }

            return(
                <div>  
                    <div className="row">

                        <div className="col-md-3 center">
                            <div className="container">
                                <form encType="multipart/form-data">
                                    <label className="btn btn-success">
                                        <input type="file" name="file" id="file" onChange={this.uploadID}/> 
                                        Upload ID
                                    </label>                                 
                                </form>
                            </div>

                            <div className="container">
                                <img className="img-fluid rounded" src={IdPic} alt=""/>
                            </div>
                        </div>

                        <div className="col-md-3 center">
                            <div className="container">
                            <form encType="multipart/form-data">
                                    <label className="btn btn-success">
                                        <input type="file" name="file" id="file" onChange={this.uploadDrivers}/> 
                                        Upload Drivers License
                                    </label>                                 
                                </form>
                            </div>

                            <div className="container">
                                <img className="img-fluid rounded" src={driversPic} alt=""/>
                            </div>
                        </div>

                        <div className="col-md-3 center">
                            <div className="container">
                            <form encType="multipart/form-data">
                                    <label className="btn btn-success">
                                        <input type="file" name="file" id="file" onChange={this.uploadCarPic}/> 
                                        Upload Car Picture
                                    </label>                                 
                                </form>
                            </div>

                            <div className="container">
                                <img className="img-fluid rounded" src={carPic} alt=""/>
                            </div>
                        </div>

                        <div className="col-md-3 center">
                            <div className="container">
                            <form encType="multipart/form-data">
                                    <label className="btn btn-success">
                                        <input type="file" name="file" id="file" onChange={this.uploadCarRegistration}/> 
                                        Upload Car Registration
                                    </label>                                 
                                </form>
                            </div>

                            <div className="container">
                                <img className="img-fluid rounded" src={carRegPic} alt=""/>
                            </div>
                        </div>

                    </div>

                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>LOADING</h1>
                </div>
            )
        }
    }

}

export default VerificationDocuments;