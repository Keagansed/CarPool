// Code adapted from : https://stackoverflow.com/questions/9594598/add-markers-along-a-route
var polyline = new window.google.maps.Polyline({});
export async function waypointGenerator(oriLat,oriLng, destLat,destLng){
    var pointsArr = [];
    var origin= oriLat+","+oriLng;
    var destination= destLat +","+destLng;
    var originObj= {'lat':oriLat,'lng':oriLng};
    var destObj= {'lat':destLat,'lng':destLng}; 
    var directionsService = new window.google.maps.DirectionsService();
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === window.google.maps.DirectionsStatus.OK) {
            var route = response.routes[0];
            var legs = route.legs;
            polyline.setPath([]);

            for(let i = 0 ; i < legs.length; i++){
                var steps = legs[i].steps;
                for(let j = 0 ; j < steps.length ; j++){
                    var nextSegment = steps[j].path;
                    for(let k = 0; k < nextSegment.length ; k++){
                        polyline.getPath().push(nextSegment[k]);                    }
                }
            }

            pointsArr.push(originObj);
            var points = polyline.GetPointsAtDistance(2000);
            for(let i = 0 ; i<points.length;i++){
                var pointObj = {'lat':points[i].lat(),'lng':points[i].lng()};
                pointsArr.push(pointObj)
            }
            pointsArr.push(destObj);      

        } else {
            alert("directions response " + status);
        }
    });
    console.log(pointsArr);
    return pointsArr; 
}


// A method which returns an array of GLatLngs of points a given interval along the path  
window.google.maps.Polyline.prototype.GetPointsAtDistance = function(metres) {
    var next = metres;
    var points = [];
    // some awkward special cases
    if (metres <= 0) return points;
    var dist = 0;
    var olddist = 0;
    for (var i = 1;
        (i < this.getPath().getLength()); i++) {
            olddist = dist;
            dist += window.google.maps.geometry.spherical.computeDistanceBetween(this.getPath().getAt(i), this.getPath().getAt(i - 1));
            while (dist > next) {
                var p1 = this.getPath().getAt(i - 1);
                var p2 = this.getPath().getAt(i);
                var m = (next - olddist) / (dist - olddist);
                points.push(new window.google.maps.LatLng(p1.lat() + (p2.lat() - p1.lat()) * m, p1.lng() + (p2.lng() - p1.lng()) * m));
                next += metres;
            }
        }
    return points;
}
