import $ from 'jquery';
import { 
  getFromStorage
  } from './localStorage.js'

$(document).ready(()=>{
    var stars = 1;

    $(document).on("submit","#vouchSubmit",(event)=>{
        event.preventDefault();
        const obj = getFromStorage('sessionKey');
        fetch('/api/account/submitVouch',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                idBy:obj.token,
                idFor:$("#vouchModal").attr("data-id"),
                rating:stars,
                date:new Date(),
                reviewTitle:$("#title").val(),
                reviewBody:$("#review").val()
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
        })
        $('#vouchModal').modal('toggle');
        window.location.reload();
    });


    $(document).on("click","#star1",(event)=>{
        $("#star2").removeClass("btn-warning");
        $("#star3").removeClass("btn-warning");
        $("#star4").removeClass("btn-warning");
        $("#star5").removeClass("btn-warning");

        $("#star2").addClass("btn-default");
        $("#star3").addClass("btn-default");
        $("#star4").addClass("btn-default");
        $("#star5").addClass("btn-default");

        stars = 1;
    });

    $(document).on("click","#star2",(event)=>{
        $("#star3").removeClass("btn-warning");
        $("#star4").removeClass("btn-warning");
        $("#star5").removeClass("btn-warning");

        $("#star2").addClass("btn-warning");
        $("#star3").addClass("btn-default");
        $("#star4").addClass("btn-default");
        $("#star5").addClass("btn-default");

        stars = 2;
    });

    $(document).on("click","#star3",(event)=>{
        $("#star4").removeClass("btn-warning");
        $("#star5").removeClass("btn-warning");

        $("#star2").addClass("btn-warning");
        $("#star3").addClass("btn-warning");
        $("#star4").addClass("btn-default");
        $("#star5").addClass("btn-default");

        stars = 3;
    });

    $(document).on("click","#star4",(event)=>{
        $("#star5").removeClass("btn-warning");

        $("#star2").addClass("btn-warning");
        $("#star3").addClass("btn-warning");
        $("#star4").addClass("btn-warning");
        $("#star5").addClass("btn-default");

        stars = 4;
    });

    $(document).on("click","#star5",(event)=>{
        $("#star2").addClass("btn-warning");
        $("#star3").addClass("btn-warning");
        $("#star4").addClass("btn-warning");
        $("#star5").addClass("btn-warning");

        stars = 5;
    });


});

