 // File Type: Utility, General use functions

/**
 * Purpose: Functions to provide a specific "Trust" score to the user based on the documents the user has uploaded
 */

 // calls all the other funtions in the file to calculate the sec lvl
 // set the weights of each helper function in this function
export const calcSecLvl = function(user){ 
    let secLvl = 0;
    secLvl += hasDocs(user);
    secLvl += reviewFactor(user) * 3;
    secLvl += facebookConnected(user);
    return secLvl;
}

// all functions below should return a value >= 0 and <= 1
function hasDocs(user){
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

function facebookConnected(user){
    return 1;
}

function reviewFactor(user){   
    return 1;
}