// File Type: Store

import { action, observable } from 'mobx';

class CarpoolMatchStore {

    @observable routeArr = [];
    @observable carpoolMembers = [];
    

    @action getRoute = (token, routeId) => {

        fetch('/api/system/route/getRoute?routeId='+  routeId + '&token=' + token, { 
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(json => {
            if(json.success) {
                this.routeArr.push({
                    origin : json.data[0].startLocation,
                    destination : json.data[0].endLocation
                });

                if(json.data[0].userId !== token){

                    fetch('/api/account/profile?token=' + token + '&userId=' + json.data[0].userId,{
                        method:'GET',
                        headers:{
                            'Content-Type':'application/json'
                        },
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(json => {
                        if (json.success){
                            this.carpoolMembers.push(json.data[0]);
                        }
                    });
                
                }
            }else{
                console.log(json);
            }
        });
    }

}

export default CarpoolMatchStore;