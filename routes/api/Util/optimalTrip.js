const Route = require('../../../models/Route.js');

class routeTree {
    path = [];
    open = [];
    closed = [];
    children = [];
    searchDepth = 0;
    statesExpanded = 0;

    constructor() {
        
    }

    calcOptimalRoute() {

    }

    generateChildren() {

    }

    
}

class StateNode {
    currentUsers = [];          // The users that are currently in the carpool (or the physical car)  => 
    distanceToEachPoint = [];   // Distance from the current Waypoint to each of the next possible Waypoints
    distanceFromStart = 0.0;    // Distance travelled so far from the start point    
    currentState = null;        // The current state of who the fuck knows what
    previousState = null;       // The previous state that lead to this state
    visited = [];               // The waypoints that have been visited
    unvisited = [];             // The waypoints that still need to be visited

    constructor(currentUsers, previousState, currentState, visited, unvisited){
        this.currentUsers = currentUsers;        
        this.previousState = previousState;     
        this.currentState = currentState;
        this.visited  = visited;
        this.unvisited = unvisited;
    }

    // Getters and setters
    set distanceFromStart (distance) { this.distanceFromStart = distance; }
    get distanceFromStart () { return this.distanceFromStart; }
    
    set distanceToEachPoint (distance) { this.distanceToEachPoint = distance; }
    get distanceToEachPoint () { return this.distanceToEachPoint; }

    get currentState () { return this.currentState; }
    get previousState () { return this.previousState; }
    get visited () { return this.visited; }
    get unvisited () { return this.unvisited; }           
}

/* 
* Waypoint class is the physical starting or ending point of a route.
*/
class Waypoint {
    constructor(lat, long, routeId, isStart) {
        this.latitude = lat; //Latitude coordinate for the waypoint
        this.longitude = long; //Longitude coordinate for the waypoint
        this.route(routeId); //Gets and stores the entire route object associated with this waypoint
        this.isStart = isStart; //Set to true if it is the starting point for the route
    }
    
    // Getters and Setters        
    set latitude (lat) { this.latitude = lat; } 
    get latitude () { return this.latitude; }

    set longitude (long) { this.longitude = long; }
    get longitude () { return this.longitude; }

    set route (routeId) {
        Route.findOne({
            _id: routeId
        }, (err, route) => {
            if(!err) {
                this.route = route;
            }
        })
    } 
    get route () { return this.route; }       

    set isStart (start) { this.isStart = start; }
    get isStart () { return this.isStart; }

    //Calculate distance between waypoints                
    distance(otherPoint) {        
        return 0;                
    }
}