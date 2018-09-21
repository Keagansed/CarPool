const Trip = require('../../../models/Trip');

module.exports.updateTrips = async (trips) => {
    let upcomingTripComponentsArr = [];
    let previousTripComponentsArr = [];

    const weekArr = ['sun', 'mon','tue','wed', 'thu','fri','sat'];

    trips.forEach((trip) => {
        if(new Date(trip.dateTime) > new Date()){
            upcomingTripComponentsArr.push(trip);
        }else {
            previousTripComponentsArr.push(trip);
        }
    })

    previousTripComponentsArr.forEach((trip) => {

        let date = new Date(trip.dateTime);
        let dayOfWeek = date.getDay();
        let sameDay = false;
        let nextDay = null;

        for(let day in trip.days){
            if(trip.days[day] === true){
                if(sameDay){
                    nextDay = day;
                    break;
                }
                
                let index = weekArr.indexOf(day);

                if(index === dayOfWeek) {
                    sameDay = true;
                }                
            }
        }
        
        if(nextDay === null){
            for(let day in trip.days) {
                if (trip.days[day] === true) {
                    nextDay = day;
                    break;
                }
            }
        }
        
        let nextDayNumber = weekArr.indexOf(nextDay);
        let newDate;

        if(nextDayNumber <= dayOfWeek){
            newDate = addDays((7-dayOfWeek+nextDayNumber), trip.dateTime);
        }else{
            newDate = addDays((nextDayNumber-dayOfWeek), trip.dateTime);
        }

        let tripExists = false;

        
        for(let index = 0; index < upcomingTripComponentsArr.length && !tripExists ; index++) {
            let upcomingTrip = upcomingTripComponentsArr[index];
            
            if(trip.recurringId === upcomingTrip.recurringId) {
                tripExists = true;
                break
            }
        }

        if(!tripExists) {
            const newTrip = new Trip();

            newTrip.tripName = trip.tripName;
            newTrip.carpoolID = trip.carpoolID;
            newTrip.idBy = trip.idBy;
            newTrip.dateTime = newDate;
            newTrip.days = trip.days;
            newTrip.users = trip.users;
            newTrip.recurringId = trip.recurringId;
            newTrip.driver = trip.driver;
            newTrip.optimalTrip = trip.optimalTrip;

            upcomingTripComponentsArr.push(newTrip); 
            newTrip.save((err) => {
                if(!err) {
                    console.log(`Successfully updated recuring trip: ${err}`);
                }else{                    
                    console.log(`Failed to update recuring trip: ${err}`);                    
                }
            });
        }
    })

    let obj = {
        previousTripComponentsArr,
        upcomingTripComponentsArr,
    }

    return obj;
}

addDays = (days,date) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    return newDate;
};