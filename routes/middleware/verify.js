const UserSession = require('../../models/UserSessions.js');

let verify = function(req, res, next) {
    const { query } = req;
    const { token } = query;

    let date = new Date();
    let currentDate = date.toDateString();
    
    UserSession.find({
        userId:token,
        timestamp: currentDate
    }, (err,sessions) => {
        if(err) {
            return res.send({ 
                verifySuccess:false,
                verifyMessage:"Error: Server Error"
            });
        }
        
        if(sessions.length != 1) {
            return res.send({ 
                verifySuccess:false,
                verifyMessage:"Error: Invalid session"
            });
        }else {
            res.set({ 
                verifySuccess:true,
                verifyMessage:"Good session"
            });
            next();
        }
    });
}

module.exports = verify;