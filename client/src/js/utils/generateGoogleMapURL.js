export const generateURL = (routeArr) =>{
    let url = `https://www.google.com/maps/dir/?api=1&origin=${routeArr[0].lat},${routeArr[0].lng}`;
    url += `&destination=${routeArr[routeArr.length-1].lat},${routeArr[routeArr.length-1].lng}`;
    url += `&travelmode=driving&waypoints=`;
    url += `${routeArr[1].lat},${routeArr[1].lng}`;
    for (let index = 2; index < routeArr.length-1; index++) {
        url += `|${routeArr[index].lat},${routeArr[index].lng}`     
    }
    url += `&dir_action=navigate`;

    return url;
}
// https://www.google.com/maps/dir/?api=AIzaSyByiVkTN7KXkkNnPKUCVehZ970UdKw94YE&origin=-25.86518,28.160347&destination=-25.8571743,28.186734099999967&travelmode=driving&waypoints=-25.841237,28.135862999999972|-25.84725, 28.13871&dir_action=navigate
