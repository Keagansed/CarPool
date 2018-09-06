// File Type: Store

import { action, observable } from 'mobx';
import { Link } from 'react-router-dom';
import React from 'react';

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
                            let memberComponent = (
                                <div 
                                    className="row bordbot-1px-dash-grey" 
                                    key={Math.random()}
                                >
                                    <div className="col-6">
                                        {json.data[0].firstName+' '+json.data[0].lastName}
                                    </div>
                                    <div className="col-6 vertical-right">
                                        <Link to={"/ProfilePage/"+json.data[0]._id}>View Profile</Link>
                                    </div>
                                </div>
                            )
                            
                            this.carpoolMembers.push(memberComponent);
                            console.log('TCL: CarpoolMatchStore -> @actiongetRoute -> this.carpoolMembers', this.carpoolMembers.length);
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