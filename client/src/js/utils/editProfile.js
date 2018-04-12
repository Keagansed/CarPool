import $ from 'jquery';

export function disableEditBut(tog)
{
	$(document).ready(function(){
		$("#startEdit").prop("disabled",true);
	});
}

$(document).ready(()=>{

	$(document).on("submit","#upProInfo",(event)=>{
		event.preventDefault();
		fetch('/api/account/updateProfile',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				firstName:$("#upFName").val(),
				lastName:$("#upLName").val(),
				email:$("#upEmail").val(),
				id:$("#upId").val(),
				_id:$("#userId").val()
			})
		})
		.then(res=>res.json())
		.catch(error => console.error('Error:', error))
		.then(json=>{
			if(json.success){
				alert("Successfully updated!");
			}else{
				alert(json.message);
			}
		});
	});
});