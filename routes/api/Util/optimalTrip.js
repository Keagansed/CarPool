// File Type: Utility

const distanceCalculation = require('./distanceCalculation');
const Route = require('../../../models/Route.js');

/*
    Requires an array of objects that contains the user and their route as well as the userID
    of the driver. GL HF :).
*/
module.exports = class routeTree {
    // open = [];
    // closed = [];
    // children = [];
    // searchDepth = 0;
    // statesExpanded = 0;
    // rUsers = []; // object with user object and route object together => {route:{}, user:{}}

    constructor(rusers, driverId) {
        this.open = [];
        this.closed = [];
        this.children = [];
        this.searchDepth = 0;
        this.statesExpanded = 0;
        this.rUsers = rusers;

        let route = null;
        let currentWaypoints = [];
        let currentWaypoint = null;
        let visited = [];
        let unvisited = [];
        let startWP = null;
        let endWP = null;
        
        for(let i = 0; i < this.rUsers.length; i++) {
            
            let user = this.rUsers[i].user;
            let route = this.rUsers[i].route;

            startWP = new Waypoint(route.startLocation.lat, route.startLocation.lng, route._id);            
            endWP = new Waypoint(route.endLocation.lat, route.endLocation.lng, route._id);
            
            startWP.end = endWP;
            endWP.start = startWP;

            unvisited.push(endWP);
            
            if(user._id === driverId) {
                startWP.isDriver = true;
                endWP.isDriver = true;
                
                visited.push(startWP);

                currentWaypoints.push(startWP);
                currentWaypoint = startWP;
            }else{
                unvisited.push(startWP);                
            }
        }     

        let startNode = new StateNode(currentWaypoints, currentWaypoint, null, visited, unvisited, null);

        startNode.calculateDistancesFromEach();
        startNode.distanceFromStart = 0;  
        startNode.updateHeuristic();

        this.open.push(startNode);
    }

    /*
        The actual A* Algorithm to determine the optimal route. Checks if the goal state 
        has been reached, if not then it gets the children and pushes them to open. The
        open array is then sorted by heuristic value and the currentState is added to closed.
    */
    calcOptimalRoute() {
        let currentState = null;
        let goalReached = false;

        while (!goalReached && (this.open.length > 0)) {
            let array = this.open.splice(0,1);
            currentState = array[0];

            goalReached = this.isGoalState(currentState);

            if(!goalReached) {
                this.children = this.generateChildren(currentState);
                // statesExpanded++;

                while(this.children.length > 0) {
                    this.open.push(this.children.pop());
                }
                
                // this.children = [];
                this.sort();

                this.closed.push(currentState);
            }
        }

        let tripPath = this.package(currentState);

        return tripPath;
    }

    /*
        Generates the possible children of the current state. Goes through each waypoint 
        of 'univisted' in the current state and only if the waypoint is not the driver's
        end waypoint, and any other valid waypoints. If the waypoint is a start waypoint
        then it adds it, but if it is an end waypoint then it only adds it if the start
        waypoint has been visited (or is the the car - currentWaypoints).
    */
    generateChildren(node) {
        let children = [];
        let visited = [];
        let unvisited = [];

        node.visited.forEach((wp) => {
            visited.push(wp);
        });

        node.unvisited.forEach((wp) => {
            unvisited.push(wp);
        });

        for(let i = 0; i < unvisited.length; i++) {                        
            let currentWaypoint = unvisited[i];
            let allow = true;
            
            if(unvisited.length > 1) {
                if(currentWaypoint.isDriver) {
                    allow = false;                 
                }  
            }
            
            if(currentWaypoint.end === undefined) {
                let x = node.currentWaypoints.indexOf(currentWaypoint.start);

                if(x === -1) {
                    allow = false;
                }
            }
            
            if(allow) {
                let prevWaypoint = node.currentWaypoint;

                visited.push(currentWaypoint);
                unvisited.splice(i, 1);            

                let tempUsers = [];
                node.currentWaypoints.forEach((wp) => {
                    tempUsers.push(wp);
                })

                if(currentWaypoint.start === undefined) {
                    tempUsers.push(currentWaypoint);
                }else{
                    for(let j = 0; j < tempUsers.length; j++) {

                        if(tempUsers[j].end === currentWaypoint) {
                            tempUsers.splice(j, 1);
                            j--;
                        } 

                    } 
                }
                
                let temp = new StateNode(tempUsers, currentWaypoint, prevWaypoint, visited, unvisited, node);
                temp.calculateDistancesFromEach();
                temp.calculateDistanceFromStart(node.distanceFromStart);
                temp.updateHeuristic();
                children.push(temp);  

                visited = [];
                unvisited = [];
                
                node.visited.forEach((wp) => {
                    visited.push(wp);
                });
        
                node.unvisited.forEach((wp) => {
                    unvisited.push(wp);
                });
            }
        } 
        
        return children;
    }

    /*
        Checks if the current state is the goal state by determining whether all of the start 
        and end waypoints have been visited (univisted is empty) and if the current waypoint
        is the end waypoint (end location of the driver) of the first waypoint that was visited
        (the start waypoint of the driver).
    */
    isGoalState(state) {

        if(state.unvisited.length === 0) {
            let x = state.visited.length - 1;

            if(state.visited[0].end === state.visited[x]) { //This is probably the worst line of code I've ever written :) - Michael
                return true; 
            }

        }

        return false;
    }

    /*
        Sorts the 'open' array in order of the heuristic value of each state so that the 
        state with the lowest heuristic value (f(n)) will be chosen first.
    */
    sort() {
        for (let i = 0; i < (this.open.length - 1); i++) {
            for (let j = 0; j < (this.open.length - i - 1); j++) {

                if(this.open[j].heuristicVal > this.open[j+1].heuristicVal) {
                    let temp = this.open[j];
                    this.open[j] = this.open[j+1];
                    this.open[j+1] = temp;
                }

            }
        }
    }

    /*
        Gets the path that must be travelled and packages the necessary information for
        each waypoint into an object and pushing it into an array. This is what the entire
        optimalTrip calculation returns.
    */
    package(finalState) {
        let path = this.getPath(finalState); 
        let tripPath = [];
        let temp;
        

        for (let i = 0; i < path.length; i++) {
            let isStart = false;

            if(path[i].start === undefined) {
                isStart = true;
            }

            temp = {
                lat: path[i].latitude,
                lng: path[i].longitude,
                routeId: path[i].route,
                start: isStart
            }

            tripPath.push(temp);
        }

        return tripPath;
    }

    /*
        Gets the path (waypoints) that must be traveled for the optimal trip by propagating
        backwards through the path that was taken to get to the goal state and then reversing 
        that path.
    */
    getPath(state) {
        let node = state;
        let path = [];

        while (node.parentNode !== null) { 
            path.push(node.currentWaypoint);
            node = node.parentNode;
        }

        path.push(node.currentWaypoint);

        path.reverse();

        return path;
    }
}

/*
    The state in the state space that contains the visited and unvisited waypoints
    at that point in the state space as well as the heuristic value (feasibility), the 
    traveled to get to this point, the current waypoint, the parent state (to maintain
    the path taken), the current start waypoints that are in the state (think of them as
    people in the car).
    Note - previousWaypoint is redundant as we need the parentNode for the path which contains
           it's 'currentWaypoint' which is the current states previousWaypoint. 
*/
class StateNode {
    // currentWaypoints = [];          // The users that are currently in the carpool (or the physical car)  => 
    // distanceToEachPoint = [];       // Distance from the current Waypoint to each of the next possible Waypoints
    // distanceFromStart = 0.0;        // Distance travelled so far from the start point
    // currentWaypoint = null;
    // previousWaypoint = null;        // The previous state that lead to this state
    // visited = [];                   // The waypoints that have been visited
    // unvisited = [];                 // The waypoints that still need to be visited
    // heuristicVal = -1;
    // parentNode = null;

    constructor(currentUsers, currentWaypoint, previousWaypoint, visited, unvisited, parent){
        this._currentWaypoints = currentUsers;
        this._distanceToEachPoint = [];       // Distance from the current Waypoint to each of the next possible Waypoints
        this._distanceFromStart = 0.0;     
        this._currentWaypoint = currentWaypoint;
        this._previousWaypoint = previousWaypoint;
        this._visited  = visited;
        this._unvisited = unvisited;
        this._heuristicVal = -1;
        this._parentNode = parent;
    }

    // Getters and setters
    set currentWaypoints (waypoints) {
        for(let i = 0; i < waypoints.length; i++) {
            this._currentWaypoints.push(waypoints[i]);
        }
    }
    get currentWaypoints () { return this._currentWaypoints; }

    set distanceFromStart (distance) { 
        for(let i = 0; i < distance.length; i++) {
            this._distanceFromStart.push(distance[i]);
        }
     }
    get distanceFromStart () { return this._distanceFromStart; }
    
    set distanceToEachPoint (distance) { 
        for(let i = 0; i < distance.length; i++) {
            this._distanceToEachPoint.push(distance[i]);
        } 
    }
    get distanceToEachPoint () { return this._distanceToEachPoint; }

    set currentWaypoint (waypoint) { this._currentWaypoint = waypoint; }
    get currentWaypoint () { return this._currentWaypoint; }

    set previousWaypoint (waypoint) { this._previousWaypoint = waypoint; }
    get previousWaypoint () { return this._previousWaypoint; }

    set visited (visited) { this._visited = visited; }
    get visited () { return this._visited; }

    set unvisited (unvisited) { this._unvisited = unvisited; }
    get unvisited () { return this._unvisited; }

    set parentNode (node) { this._parentNode = node; }
    get parentNode () { return this._parentNode; }
    
    /*
        Calculates the distance between each of the unvisited waypoints and the current waypoint
        in order and returns an array with each of those distances. Then calculates the distance 
        from the start.
    */
     calculateDistancesFromEach() {
        let dist, distanceToEach = [];
        
        for(let i = 0; i < this.unvisited.length; i++) {
            dist = this.distance(this._currentWaypoint, this._unvisited[i]);
            distanceToEach.push(dist);
        }

        this._distanceToEachPoint = distanceToEach;

    }

    /*
        Calculate the distance from the start waypoint to current waypoint by determining the distance from 
        the current waypoint and the previous waypoint and then adding that distance to the distanceFromStart
        of the previous state.
    */
    calculateDistanceFromStart(distance) {
        let dist = this.distance(this._currentWaypoint, this._previousWaypoint);
        this._distanceFromStart = distance + dist;
    }

    /*
        Calculate distance between waypoints (not actual driving distance, but physical difference).             
    */
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
        let g = this._distanceFromStart;
        let h = this.calcHeuristic();

        this._heuristicVal = g + h;
    }

    /* 
        The actual heuristic value, f(n), is the distance of each of the current waypoints 
        (each person in the car, including the driver) to the end waypoint (or location) of 
        that person's route, as well as the physical distance from the start waypoint to the
        current waypoint (not the distance travelled). Can also add the number of states that
        have been expanded.
    */
    calcHeuristic() {
        let heuristic = 0;

        for(let i = 0; i < this._currentWaypoints.length; i++) {
            heuristic += this.distance(this._currentWaypoints[i], this._currentWaypoints[i].end);
        }

        heuristic += this.distance(this._visited[0], this._currentWaypoint);
        return heuristic;
    }
}

/* 
    Waypoint class is the physical starting or ending point of a route.
*/
class Waypoint {
    constructor(lat, long, routeId) {
        this._latitude = lat; //Latitude coordinate for the waypoint
        this._longitude = long; //Longitude coordinate for the waypoint
        this._route =routeId; //Gets and stores the entire route object associated with this waypoint
        this._isDriver = false;
    }
    
    // Getters and Setters        
    set latitude (lat) { this._latitude = lat; }
    get latitude () { return this._latitude; }

    set longitude (long) { this._longitude = long; }
    get longitude () { return this._longitude; }

    set route (routeId) {
        // Route.findOne({
        //     _id: routeId
        // }, (err, route) => {
        //     if(!err) {
        //         this.route = route;
        //     }
        // })
        this._route = routeId;
    } 
    get route () { return this._route; }       

    set start (waypoint) { this._start = waypoint; }
    get start () { return this._start; }

    set end (waypoint) { this._end = waypoint; }
    get end () { return this._end; }    

    set isDriver (driver) { this._isDriver = driver; }
    get isDriver () { return this._isDriver; }

}