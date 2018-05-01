import { observable, action, computed } from 'mobx';

class profileStore {

    @observable user = {};
    @observable secLvl = 1;    
    @observable profileFound = false;
    @observable token = null;

    @computed get firstName() { return this.user.firstName}
    @computed get lastName() {return this.user.lastName}
    @computed get email() { return this.user.email}
    @computed get idNum() { return this.user.id}
    @computed get profilePic() { return this.user.profilePic };

    @action getProfile = token => {
        this.token = token;
        fetch('/api/account/getProfile?_id=' + token)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
		.then((json) => {                   
            this.user = json[0];
            this.profileFound = true;
        })
    }

    //Editing profile

    @observable editMode = false;
    @observable eFName = '';
    @observable eLName = '';
    @observable eEmail = '';
    @observable eID = '';
    @observable ePass = '';
    @observable eNewPass = '';

    @action editSubmit = () => {

        fetch('/api/account/updateProfile',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName: this.eFName,
                lastName: this.eLName,
                email: this.eEmail,
                id: this.eID,
                pass: this.ePass,
                newPass: this.eNewPass,
                _id: this.token
            })
        })
        .then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(json=>{
            if(json.success){
                //alert("Successfully updated!");
                this.editMode = false;

                this.user.firstName = this.eFName;
                this.user.lastName = this.eLName;
                this.user.idNum = this.eID;
                this.user.email = this.eEmail;
            }else{
                alert(json.message);
            }
        });
    }

}

const ProfileStore = new profileStore();

export default ProfileStore;