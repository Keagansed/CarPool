import $ from 'jquery';

import {
    getFromStorage
} from '../utils/localStorage.js'

export const submitVouch = (rating) =>
{
    const obj = getFromStorage('sessionKey');
    if(obj.token !== document.getElementById("vouchModal").getAttribute("data-id"))
    {
        fetch('/api/account/submitVouch',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idBy:obj.token,
                idFor:$("#vouchModal").attr("data-id"),
                rating:rating,
                date:new Date(),
                reviewTitle:$("#title").val(),
                reviewBody:$("#review").val()
            })
        }).then(res=>res.json())
            .catch(error => console.error('Error:', error))
            .then(json=>{
                console.log('json',json); //========== Probably remove ===============
            });
        window.location.reload();
    }
    else
    {
        window.alert("You may not vouch for yourself");
    }
};