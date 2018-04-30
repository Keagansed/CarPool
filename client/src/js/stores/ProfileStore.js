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

}

const ProfileStore = new profileStore();

export default ProfileStore;