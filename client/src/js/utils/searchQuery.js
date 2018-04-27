import $ from 'jquery';

$(document).ready(()=>{
	$(document).on("click", ".name",function(e){
		window.location = window.location.href + "./../" + $(this).attr("data-id");
    });
});

// export const viewProfile = (profileID) => {
//     window.location = window.location.href + "./../" + profileID;
// }

	
export const searchUsers = (_name) => {
    let results = "";

    return fetch('/api/account/getUser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:_name,
        })
    })
    .then(res=>res.json())
    .catch(error => console.error('Error:', error))
    .then(json=>{

        if (json.length > 0){
            //~ let profilePic; 
            var i;
            results = "";

            for (i = 0; i < json.length; ++i) {
                //~ profilePic = "../api/account/getImage?filename=" + json[i].profilePic;
                results += "<div class=\"row searchItem\">";
                // results += "<img src=\"" + profilePic + "\" class=\"col-md-3 col-4 profilePic\" alt=\"Profile Pic\" /> ";
                results += "<div class=\"name\" data-id=\"" + json[i]._id + "\">" + json[i].firstName +" " + json[i].lastName + "</div></div>";
            }
        }else{
            if (_name === ""){
                results = "";
            }else{
                results = "<div id=\"noUser\">User Not Found</div>";
            }
        }
        return results;
    });
}



