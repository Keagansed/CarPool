const Route = require('../../../models/Route.js');
const distanceCalculation = require('./distanceCalculation');

class routeTree {
    open = [];
    closed = [];
    children = [];
    searchDepth = 0;
    statesExpanded = 0;
    rUsers = []; // object with user object and route object together => {route:{}, user:{}}

    constructor(rusers, driverId) {
        rUsers = rusers;
        let route = null;
        let currentWaypoint = [];
        let visited = [];
        let unvisited = [];
        let startWP = null;
        let endWP = null;
        
        for(i = 0; i < rUsers.length; i++) {
            user = rUsers[i].user;
            route = rUsers[i].route;

            startWP = new Waypoint(route.startLocation.lat, route.startLocation.lng, route._id);
            endWP = new Waypoint(route.endLocation.lat, route.endLocation.lng, route._id);
            
            startWP.end(endWP);
            endWP.start(startWP);

            unvisited.push(endWP);
            
            if(user._id === driverId) {
                startWP.isDriver(true);
                endWP.isDriver(true);
                
                visited.push(startWP);

                currentWaypoint.push(startWP);
            }else{
                unvisited.push(startWP);                
            }
        }        

        let startNode = new StateNode(currentWaypoint, startWP, null, visited, unvisited, null);

        startNode.calculateDistancesFromEach();
        startNode.distanceFromStart = 0;  
        startNode.updateHeuristic();

        open.push(startNode);
    }

    calcOptimalRoute() {
        let currentState = null;
        let goalReached = false;

        console.log(open.isEmpty); // REMOVE ONCE YOU KNOW THAT IT WORKS
        while (!goalReached && !open.isEmpty()) {
            currentState = open.pop();

            goalReached = isGoalState(currentState);

            if(!goalReached) {
                children = generateChildren(currentState);
                statesExpanded++;

                for(let i = 0; i < children.length; i++) {
                    open.push(children.pop());
                }
                children = [];
                sort();

                closed.add(currentState);
            }
        }
        return currentState;
    }

    generateChildren(node) {
        let children = [];
        let visited = node.visited;
        let unvisited = node.unvisited;

        for(let i = 0; i < unvisited.length; i++) {
            let currentWaypoint = unvisited[i];
            let allow = true;
            
            if(unvisited.length > 1) {
                if(currentWaypoint.isDriver) {
                    allow = false                 
                }  
            }
            
            if(currentWaypoint.end === null) {
                let x = node.currentWaypoints.indexOf(currentWaypoint);

                if(x === -1) {
                    allow = false;
                }
            }
            
            if(allow) {
                let prevWaypoint = node.currentWaypoint;

                visited.push(currentWaypoint);
                unvisited.splice(i, 1);            

                let tempUsers = node.currentWaypoints;

                if(currentWaypoint.start === null) {
                    tempUsers.push(currentWaypoint);
                }else {
                    for(let j = 0; j < tempUsers.length; j++) {
                        if(tempUsers[j].end === currentWaypoint) {
                            tempUsers.splice(j, 1);
                        }                                
                    } 
                }                      

                let temp = new StateNode(tempUsers, currentWaypoint, prevWaypoint, visited, unvisited, node);
                temp.calculateDistancesFromEach();
                temp.calculateDistanceFromStart(node.distanceFromStart);
                temp.updateHeuristic();
                children.push(temp);   
            }
        } 
        
        return children;
    }

    isGoalState(state) {
        if(state.unvisited.length === 0) {
            let x = state.visited.length - 1;

            if(state.visited[0].end === state.visited[x]) { //This is probably the worst line of code I've ever written :) - Michael
                return true; 
            }
        }
        return false;
    }

    sort() {
        for (let i = 0; i < (open.length - 1); i++) {
            for (let j = 0; j < (open.length - i - 1); j++) {
                if (open[j].heuristicVal > open[j+1].heuristicVal){
                    let temp = open[j];
                    open[j] = open[j+1];
                    open[j+1] = temp;
                }
            }
        }
    }
}

class StateNode {
    currentWaypoints = [];          // The users that are currently in the carpool (or the physical car)  => 
    distanceToEachPoint = [];       // Distance from the current Waypoint to each of the next possible Waypoints
    distanceFromStart = 0.0;        // Distance travelled so far from the start point
    currentWaypoint = null;
    previousWaypoint = null;        // The previous state that lead to this state
    visited = [];                   // The waypoints that have been visited
    unvisited = [];                 // The waypoints that still need to be visited
    heuristicVal = -1;
    parentNode = null;

    constructor(currentUsers, currentWaypoint, previousWaypoint, visited, unvisited, parent){
        this.currentUsers = currentUsers;        
        this.currentWaypoint = currentWaypoint;
        this.previousWaypoint = previousWaypoint;
        this.visited  = visited;
        this.unvisited = unvisited;
        this.parent = parent;
    }

    // Getters and setters
    set distanceFromStart (distance) { this.distanceFromStart = distance; }
    get distanceFromStart () { return this.distanceFromStart; }
    
    set distanceToEachPoint (distance) { this.distanceToEachPoint = distance; }
    get distanceToEachPoint () { return this.distanceToEachPoint; }

    get currentWaypoint () { return this.currentWaypoint; }
    get previousWaypoint () { return this.previousWaypoint; }
    get visited () { return this.visited; }
    get unvisited () { return this.unvisited; }   
    
    // Calculates the distance between each of the unvisited waypoints and the current waypoint
    // in order and returns an array with each of those distances. Then calculates the distance from the start.
    calculateDistancesFromEach() {
        let dist, distanceToEach = [];
        
        for(let i = 0; i < this.unvisited.length; i++) {
            dist = distance(currentWaypoint, this.unvisited[i]);
            distanceToEach.push(dist);
        }

        this.distanceToEachPoint = distanceToEach;

    }

    // Calculate the distance from the start waypoint to current waypoint by determining the distance from 
    // the current waypoint and the previous waypoint and then adding that distance to the distanceFromStart
    // of the previous state.
    calculateDistanceFromStart(distance) {
        dist = distance(this.currentWaypoint, this.previousWaypoint);
        this.distanceFromStart = distance + dist;
    }

    //Calculate distance between waypoints (not actual driving distance, but physical difference).             
    distance(waypoint1, waypoint2) {
        let lat1 = waypoint1.latitude;
        let lng1 = waypoint1.longitude;
        let lat2 = waypoint2.latitude;
        let lng2 = waypoint2.longitude;

        let dist = distanceCalculation.calcDistance(lat1, lng1, lat2, lng2);

        return dist;
    }

    /*
        A*: f*(n) = g*(n) + h*(n);
        g*(n) -> estimates the shortest path from the start node to the node n (current node)
        h*(n) -> estimates the actual cost from the start node to the goal node that passes through 
                node n
    */
    updateHeuristic() {
        let g = this.distanceFromStart;
        let h = calcHeuristic();

        this.heuristicVal = g + h;
    }

    /* The actual heuristic value, f(n), is the distance of each of the current waypoints 
       (each person in the car, including the driver) to the end waypoint (or location) of 
       that person's route, as well as the physical distance from the start waypoint to the
       current waypoint (not the distance travelled).
    */
    calcHeuristic() {
        let heuristic = 0;

        for(let i = 0; i < this.currentWaypoints.length; i++) {
            heuristic += distance(this.currentWaypoints[i], this.currentWaypoints[i].end);
        }

        heuristic += this.distance(this.visited[0], this.currentWaypoint);
        return heuristic;
    }
}

/* 
* Waypoint class is the physical starting or ending point of a route.
*/
class Waypoint {
    constructor(lat, long, routeId) {
        this.latitude = lat; //Latitude coordinate for the waypoint
        this.longitude = long; //Longitude coordinate for the waypoint
        this.route(routeId); //Gets and stores the entire route object associated with this waypoint
        this.isDriver = false;
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

    set start (waypoint) { this.start = waypoint; }
    get start () { return this.start; }

    set end (waypoint) { this.end = waypoint; }
    get end () { return this.end; }    

    set isDriver (driver) { this.isDriver = driver; }
    get isDriver () { return this.isDriver; }

}

module.exports.routeTree;