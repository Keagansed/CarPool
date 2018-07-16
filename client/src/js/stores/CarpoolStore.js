import { observable, action } from 'mobx';

class carpoolStore {

    @observable carpoolName;
    @observable users = [];
    @observable routes = [];
    @observable carpoolID;

    @action addCarpool = (pushToFirebase) => {
        fetch('/api/system/addCarpool',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                carpoolName: this.carpoolName,
                from: this.from,
                longFrom: this.longFrom,
                latFrom: this.latFrom,
                to: this.to,
                longTo: this.longTo,
                latTo: this.latTo,
                users: this.users,
            })
        })
            .then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=>{
                if(json.success){
                    this.carpoolID = json._id;
                    pushToFirebase();
                }else{
                    alert(json.message);
                }
            })
    }

    @action getCarpool(id){
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
                console.log(json.data[0].routes);
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
            }
            else{
                console.log("Unable to retrieve carpool");
            }
        })
    }

}

const CarpoolStore = new carpoolStore();

export default CarpoolStore;