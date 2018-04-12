import $ from 'jquery';

$(document).ready(()=>{

     $(document).on("input cut","#searchUsers",(event) => {
        event.preventDefault();
        fetch('/api/account/getUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:$("#user-search").val(),
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{

            console.log("json",json);     //should probably remove//
            if (json.length > 0){

              let profilePic; 
              var i;
              var html = "";
              for (i = 0; i < json.length; ++i) {

                profilePic = "./api/account/getImage?filename=" + json[i].profilePic;

                html += "<li class=\"list-group-item\"><div class=\"col-xs-4\">";
                html += "<img src=\"" + profilePic + "\" class=\"img-responsive img-circle\" alt=\"Profile Pic\" /> ";
                html += "<span class=\"name\">" + json[i].firstName +" " + json[i].lastName + "</span><br/></div></li>"; 

              }

              $('#user-list').html(html);
            }else{
            	if ($("#user-search").val() === ""){
            		$('#user-list').html("");
            	}else{
              		$('#user-list').html("<div id=\"noUser\">No Such User</div>");
              	}
            }
        });
    });
});

