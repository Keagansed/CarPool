// File Type: Utility

/*
    Helper function to calculate the distance between two points
    Takes in long and lat for both points as an argument
    Calls helper function degreesToRadians to make a conversion
    Returns the distance as a double
    */
module.exports.calcDistance = function(lat1, lng1, lat2, lng2){
    // Integer radius of the earth
    let earthRadiusKm = 6371;

    // Destination latitude in radians
    let dLat = degreesToRadians(lat2 - lat1);

    // Destination longitude in radians
    let dLon = degreesToRadians(lng2 - lng1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat / 2) +
            Math.sin(dLon/2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadiusKm * c;
};

/*
    Helper function to convert the measurement in degrees to radians
    Returns integer value as radians
    */
degreesToRadians = function(degrees){
    return degrees * Math.PI / 180;
};