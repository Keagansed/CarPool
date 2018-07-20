export function arrayCheckDuplicate(arrayOne, item){
    let unique = true;
    arrayOne.forEach(function(element) {
        if(element._id === item._id){
            unique = false;
        }
    });
    return unique;
}

export function generateDifferenceArray(arrRouteId, arrRouteObj, containsFlag){
    /* containsFlag: True - will return items that match in both arrays
                     False - will return items that don't match in both arrays */
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

export function generateCarpoolArr(arrCarpools,arrRecRoutes){
    let newArr=[];
    arrCarpools.forEach(function(carpoolObj){
        let contains = false;
        arrRecRoutes.forEach(function(routeObj){
            if(carpoolObj.routes.includes(routeObj._id)){
                contains = true;
            }
        });

        if(contains){
            newArr.push(carpoolObj);
        }
    });

    return newArr;
}
