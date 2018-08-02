// File Type: Utility, General use functions

/**
 * Code adapted from : https://stackoverflow.com/questions/9594598/add-markers-along-a-route
 * Nature of code due to asynchronicity
 * Detailed description: https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call/14220323#14220323
 * General solution: https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function 
 * 
 * This function is tightly coupled with RoutesStore's 'newRoute' function
 * A callback function is passed through into 'waypointGenerator' so that the waypoint array (pointsArr) can be returned to the calling function
 */
let polyline = new window.google.maps.Polyline({});

export function waypointGenerator(oriName, destName, ori, dest, time, routeName, myFunc){  

    let pointsArr = [];
    let origin= ori.lat+","+ori.lng;
    let destination= dest.lat +","+dest.lng;
    let originObj= {'lat':ori.lat,'lng':ori.lng};
    let destObj= {'lat':dest.lat,'lng':dest.lng}; 

    let directionsService = new window.google.maps.DirectionsService();
    let request={
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    }

    directionsService.route(request, function(response, status) {
        if (status === window.google.maps.DirectionsStatus.OK) {
            let route = response.routes[0];
            let legs = route.legs;
            polyline.setPath([]);

            for(let i = 0 ; i < legs.length; i++){
                let steps = legs[i].steps;
                for(let j = 0 ; j < steps.length ; j++){
                    let nextSegment = steps[j].path;
                    for(let k = 0; k < nextSegment.length ; k++){
                        polyline.getPath().push(nextSegment[k]);                    
                    }
                }
            }

            pointsArr.push(originObj);
            let points = polyline.GetPointsAtDistance(2000);
            for(let i = 0 ; i<points.length;i++){ 
                let pointObj = {'lat':points[i].lat(),'lng':points[i].lng()};
                pointsArr.push(pointObj) 
            }  
            pointsArr.push(destObj);

            myFunc(oriName, destName, ori, dest, time, routeName, pointsArr);
        }else{ 
            alert("directions response " + status);
        }
    })
}


// A method which returns an array of GLatLngs of points a given interval along the path  
window.google.maps.Polyline.prototype.GetPointsAtDistance = function(metres) {
    let next = metres;
    let points = [];

    // some awkward special cases
    if (metres <= 0) return points;
    let dist = 0;
    let olddist = 0;
    for (let i = 1; (i < this.getPath().getLength()) ; i++) {
            olddist = dist;
            dist += window.google.maps.geometry.spherical.computeDistanceBetween(this.getPath().getAt(i), this.getPath().getAt(i - 1));

            while (dist > next) {
                let p1 = this.getPath().getAt(i - 1);
                let p2 = this.getPath().getAt(i);
                let m = (next - olddist) / (dist - olddist);
                points.push(new window.google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
                next += metres;
            }
        }
    return points;
}

