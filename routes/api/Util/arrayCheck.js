// File Type: Utility, General use functions

/**
 * Purpose: Function to check if an item (param2) exists within an array (param1) if item is present in array, return false
 * In this case; array is an array of Obj and item is an Obj, Obj have an '_id' attribute
 */
module.exports.arrayCheckDuplicate = function(arrayOne, item){
    let unique = true;

    arrayOne.forEach(function(element) {
        if(element._id === item._id){
            unique = false;
        }
    });
    return unique;
}

/**
 * Purpose: Function to determine whether all the items in array1 (param1) exists within array2 (param2)
 * containsFlag (param3):    
 *      True - will return array of items that match in both arrays
        False - will return array of items that don't match in both arrays
 * In this case; param1 is a string array containing Object Id's and param2 is an Object array 
 */
module.exports.generateDifferenceArray = function(arrRouteId, arrRouteObj, containsFlag){
    /*  */
    let newArr=[];

    arrRouteObj.forEach(function(obj){
        let contains = false;

        arrRouteId.forEach(function(routeId){
            if(routeId === obj._id){
                contains = true;
            }
        });
        if(containsFlag && contains){
            newArr.push(obj);
        } else if(!containsFlag && !contains){
            newArr.push(obj);
        }
    });

    return newArr;
}

/**
 * Purpose: Function to generate a Carpool array for the user
 * Takes a list of all carpools (param1) and compares with a list of all recommended routes (param2)
 * All carpools contain an array of routes 
 * If a recommended route appears inside one of the carpool objects, add to new array
 * return CarpoolArray
 */
module.exports.generateCarpoolArr = function(arrCarpools,arrRecRoutes){
    let newArr=[];
    let counter = 0;

    arrCarpools.forEach(function(carpoolObj){
        let contains = false;
        arrRecRoutes.forEach(function(routeObj){
            counter = 0;
            while ((!contains) && (counter < carpoolObj.routes.length)) {

                if(JSON.stringify(carpoolObj.routes[counter]) === JSON.stringify(routeObj._id)) {
                    contains = true;
                }else{
                    counter++;
                }

            }
        });

        if(contains) {
            counter = 0;
            contains = false;
            while (!contains && (counter < newArr.length)){

                if(newArr[counter] === carpoolObj) {
                    contains = true;
                }else{
                    counter++;
                }
            }

            if(!contains) {
                newArr.push(carpoolObj);
            }
        }
    });
    return newArr;
}
