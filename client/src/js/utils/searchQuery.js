// File Type: Utility, General use functions

/**
 * Purpose: Functions to find specific user profiles based on their name
 */
export const searchUsers = (_name) => {
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
    .then(json=> {
        let results = "";
        if (json.length > 0){
            //~ var i;

            //~ for (i = 0; i < json.length; ++i) {
                //~ results += "<div class=\"row searchItem\">";
                //~ results += "<div class=\"name\" data-id=\"" + json[i]._id + "\">" + json[i].firstName +" " + json[i].lastName + "</div></div>";
            //~ }
		results = json;
        }else{
            if (_name !== ""){
                results = "none";
            }
        }
        return results;
    });
}



