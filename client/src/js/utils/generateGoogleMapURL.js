export const googleURL = (routeArr) =>{
    let url = "https://www.google.com/maps/dir/?api=AIzaSyByiVkTN7KXkkNnPKUCVehZ970UdKw94YE&origin=";
    url += element + "&destination=";
    url += element + "&destination=";
    url += element + "&travelmode=driving&waypoints="
    url += element;
    for (let index = 0; index < routeArr.length; index++) {
        url += "|" + element        
    }
    url += element + "&dir_action=navigate";
}
// https://www.google.com/maps/dir/?api=AIzaSyByiVkTN7KXkkNnPKUCVehZ970UdKw94YE&origin=-25.86518,28.160347&destination=-25.8571743,28.186734099999967&travelmode=driving&waypoints=-25.841237,28.135862999999972|-25.84725, 28.13871&dir_action=navigate