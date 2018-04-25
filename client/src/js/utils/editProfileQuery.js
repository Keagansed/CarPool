export const editSubmit = (_id, fName, lName, email, id, pass, newPass) => {
	fetch('/api/account/updateProfile',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify({
			firstName:fName,
			lastName:lName,
			email:email,
			id:id,
			pass:pass,
			newPass:newPass,
			_id:_id
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
}