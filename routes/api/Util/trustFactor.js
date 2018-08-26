 // File Type: Utility, General use functions

/**
 * Purpose: Functions to provide a specific "Trust" score to the user based on the documents the user has uploaded
 */

 // calls all the other funtions in the file to calculate the sec lvl
 // set the weights of each helper function in this function
 module.exports.calcSecLvl = function(user, vouches){ 
    let secLvl = 0;
    secLvl += hasDocs(user);
    secLvl += reviewFactor(vouches) * 2;
    secLvl += experienceFactor(vouches) * 2;
    // secLvl += facebookConnected(user);
    return secLvl;
}

// all functions below should return a value >= 0 and <= 1

// checks whether a user has uploaded the required documents
// parameters:
//      user: Json object; a document from the User Collection
// return:
//      double; number based on how many documents are uploaded
function hasDocs(user){
    // console.log(user.CarRegistration);
    let temp = 0;
    if (user.driversLicense !== "")
        temp++;
    if (user.IdDocument !== "")
        temp++;
    if (user.CarPic !== "")
        temp++;
    if (user.CarRegistration !== "")
        temp++;
    return temp / 4;
}

// function facebookConnected(user){
//     return 1;
// }

// calculates a value based on the amount of reviews they have.
// parameters:
//      vouvhes: Array; documents from the Vouch Collection for a particular user
// return:
//      double; Base on amount of reviews and rating
function reviewFactor(vouches){
    let numVouches = 0;
    let score = 0;
    vouches.forEach(element => {
        numVouches++;
        score = score + element.rating;
    });
    if (numVouches < 10)
        score = score / 3;
    else if(numVouches < 30)
        score = score / 2
    score = score / numVouches;
    return score / 5;
}

// Calculates a value based on the amount of trip the user hase been on.
//      Parameters:
//          vouches: Array; documents from the Vouch Collection for a particular user
//      Returns:
//          double; Value based on total trips taken
function experienceFactor(vouches){
    let tripArr = [];
    vouches.forEach(element => {
        if(!tripArr.includes(element.tripID))
            tripArr.push(element.tripID);
    });
    if (tripArr.length > 100)
        return 1;
    else
        return tripArr.length / 100;
}