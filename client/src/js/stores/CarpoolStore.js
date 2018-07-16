import { observable, action } from 'mobx';

class carpoolStore {

    @observable carpoolName;
    @observable users = [];
    @observable routes = [];
    @observable carpoolID;

    @action addCarpool = (pushToFirebase, offerId) => {
        // fetch('/api/system/addCarpool',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         carpoolName: this.carpoolName,
        //         from: this.from,
        //         longFrom: this.longFrom,
        //         latFrom: this.latFrom,
        //         to: this.to,
        //         longTo: this.longTo,
        //         latTo: this.latTo,
        //         users: this.users,
        //     })
        // })
        //     .then(res=>res.json())
        //     .catch(error => console.error('Error:', error))
        //     .then(json=>{
        //         if(json.success){
        //             this.carpoolID = json._id;
        //             pushToFirebase();
        //         }else{
        //             alert(json.message);
        //         }
        //     })
        fetch('/api/system/offers/acceptInvite?offerId=' + offerId,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(json => {
                // console.log(json);
                if(json.success){
                    this.carpoolID = json._id;
                    this.carpoolName = json.carpoolName;
                    this.routes = json.routes;
                    this.getCarpool(this.carpoolID,pushToFirebase);
                }else{
                    alert(json.message);
                }
            });
    }

    @action getCarpool(id, pushToFirebase){
        fetch('/api/system/carpool/getCarpool?_id='+ id,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success){
                
                this.routes = json.data[0].routes;
                this.carpoolName = json.data[0].carpoolName;
                this.carpoolID = id;
                this.routes.forEach(route => {
                    fetch('api/system/route/getRoute?_id='+ route,{
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json'
                        },
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(json => {
                        if(json.success){
                            this.users.push(json.data[0].userId);
                        }
                        else{
                            console.log("Unable to retrieve route");
                        }
                    })
                });
                pushToFirebase();
            }
            else{
                console.log("Unable to retrieve carpool");
            }
        })
    }

}

const CarpoolStore = new carpoolStore();

export default CarpoolStore;