export const calcSecLvl = function(user){
    let secLvl = 0;
    secLvl += hasDocs(user);
    secLvl += reviewFactor(user) * 3;
    secLvl += facebookConnected(user);
    return secLvl;
}

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