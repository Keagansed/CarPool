import $ from 'jquery';



$(document).ready(function () {
    $(document).on("click", "#profilePic", (e) =>{
        $("#file").click();
    });

    $(document).on("change", "#file", (e) => {
        $("#upProPic").click();
    });

	$(document).on("click","#upProPic",(e)=>{
		//~ e.preventDefault();
		fetch('/api/account/uploadFile',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body: {id: document.getElementById('userId').val}
		})
		//~ .then(res=>res.json())
		//~ .catch(error => console.error('Error:', error))
		//~ .then(json=>{
		    //~ console.log('json',json); //========== Probably remove ===============
		    //~ if(json.success){
			//~ alert("Successfully added file!!");
		    //~ }
		//~ });
	});
});