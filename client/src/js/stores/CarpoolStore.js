import { observable, action } from 'mobx';

class carpoolStore {

    @observable carpoolName;
    @observable users = [];
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

}

const CarpoolStore = new carpoolStore();

export default CarpoolStore;