import $ from 'jquery';

$(document).ready(()=>{


    $(document).on("submit","#vouchSubmit",(event)=>{
        event.preventDefault();
        fetch('/api/account/submitVouch',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idBy:"5ac0b4c25a00385a1f7b6d99",
                idFor:"5ac0b4c25a00385a1f7b6d99",
                rating:$("#rating").val(),
                date:"04-04-2018",
                reviewTitle:$("#title").val(),
                reviewBody:$("#review").val()
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            console.log('json',json); //========== Probably remove ===============
        })
        $('#vouchModal').modal('toggle');
        window.location.reload();
    });


});

