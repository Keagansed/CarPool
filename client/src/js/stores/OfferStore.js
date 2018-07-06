import { action, observable  } from 'mobx';

class OfferStore {
    
    @observable CarpoolName = '';
    @observable senderId = '';
    @observable senderRoute = '';
    @observable recieverId = '';
    @observable recieverRoute = '';
    @observable join = false;
    
    constructor(CarpoolName, senderId, senderRoute, recieverId, recieverRoute, join){
        this.CarpoolName = CarpoolName;
        this.senderId = senderId;
        this.senderRoute = senderRoute;
        this.recieverId = recieverId;
        this.recieverRoute = recieverRoute;
        this.join = join;
    }
}

export default OfferStore;