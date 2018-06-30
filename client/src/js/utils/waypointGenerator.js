export async function waypointGenerator(/*oriLat,oriLng, destLat,destLng*/){
    let points = [];
    let tempOriLat= -25.86518;
    let tempOriLng= 28.160347;
    let tempdestLat= -25.8564802;
    let tempdestLng= 28.18624239999997;

    var proxy_url = 'https://cors-anywhere.herokuapp.com/';
    var target_url = "https://maps.googleapis.com/maps/api/directions/json?origin="+ tempOriLat+","+tempOriLng +"&destination="+ tempdestLat+","+tempdestLng;
    var google_api_key = '&key=AIzaSyByiVkTN7KXkkNnPKUCVehZ970UdKw94YE';

    // let resp = await fetch(`${proxy_url}${target_url}${google_api_key}`);
    // let respJson = await resp.json();
    // console.log(respJson);

    fetch(`${proxy_url}${target_url}${google_api_key}`)
    .then(res =>res.json())
    .then(json =>{
        console.log("waiting");
        console.log(json);
    })
    // let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    // let coords = points.map((point, index) => {
    //     return {
    //         latitude: point[0],
    //         longitude: point[1]
    //     }
    // })
    // this.setState({ coords: coords })
    return points
}
