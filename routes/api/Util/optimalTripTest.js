/*
THIS FILE CAN BE REMOVED, IT EXISTS ONLY TO SERVE THE SUPREME OPTIMALTRIP ALGORITHM. ALL HAIL!

delete this file once sufficient testing has been done --> Ask vern/mike first
*/


let routeTree = require('./optimalTrip.js');

module.exports.test = () => { 

    let obj = [
        {
            route: {
                _id : "1",
                waypoints : [
                    {lat:-25.813692,lng:28.329799999999977},
                    {lat:-25.800726220716065,lng:28.320038924168784},
                    {lat:-25.78702042867203,lng:28.307419248974497},
                    {lat:-25.783762187173906,lng:28.288399804478104},
                    {lat:-25.781116516728808,lng:28.275855098048737},
                    {lat:-25.7818819,lng:28.276781099999994}
                ],
                time : "09:00",
                routeName : "Wilds to Menlyn",
                recommended : ["5b8e794da898784120a7911e","5b8e794da898784120a7911e"],
                routesCompared : ["5b8e794da898784120a7911e", "5b8e7a35a898784120a79124"],
                userId : "1",
                startLocation : {name : "2 Jagluiperd St, The Wilds, Pretoria, 0042, South Africa", lat : -25.813692, lng : 28.329799999999977},
                endLocation : {name : "Menlyn, Pretoria, 0063, South Africa", lat : -25.7818819, lng : 28.276781099999994}, 
            },
            user: {
                _id : "1",
                firstName : "Michael",
                lastName : "Yatrakos",
            }
        },
        {
            route: {
                _id : "2",
                waypoints : [
                    {lat:-25.8206715,lng:28.31269569999995},
                    {lat:-25.81037344964342,lng:28.30228672482167},
                    {lat:-25.8001788,lng:28.30235790000006}
                ],
                time : "09:00",
                routeName : "Woodhill to Garsfontein",
                recommended : [],
                routesCompared : ["5b8e7a35a898784120a79124","5b8e7872a898784120a7911b"],
                userId : "2",
                startLocation : {name : "1143 Woodhill Dr, Garsfontein, Pretoria, 0076, South Africa", lat : -25.8206715, lng : 28.31269569999995},
                endLocation : {name : "Garsfontein, Pretoria, 0042, South Africa", lat : -25.8001788, lng : 28.30235790000006},
            },
            user: {
                _id : "2",
                firstName : "Vernon ",
                lastName : "Francis",
            }
        },
        {
            route: {
                _id : "3",
                waypoints : [
                    {lat:-25.838447,lng:28.33971729999996},
                    {lat:-25.829434976978302,lng:28.342041129893005},
                    {lat:-25.815507072295436,lng:28.337591584344636},
                    {lat:-25.80324902574731,lng:28.323011282184098},
                    {lat:-25.78987919302422,lng:28.30993397546581},
                    {lat:-25.783877088415654,lng:28.29248089932014},
                    {lat:-25.780616927807888,lng:28.273456927807956},
                    {lat:-25.7818819,lng:28.276781099999994}
                ],
                time : "09:00",
                routeName : "Mooikloof to Menlyn",
                recommended : ["5b8e7872a898784120a7911b"],
                routesCompared : ["5b8e7872a898784120a7911b","5b8e794da898784120a7911e"],
                userId : "3",
                startLocation : {name : "Jollify Ring Rd, Mooikloof, Pretoria, 0059, South Africa", lat : -25.838447, lng : 28.33971729999996},
                endLocation : {name : "Menlyn, Pretoria, 0063, South Africa", lat : -25.7818819, lng : 28.276781099999994}, 
            },
            user: {
                _id : "3",
                firstName : "Jessica",
                lastName : "Coetzee",
            }
        },
    ]

    //LC De Villiers to Faerie Glen
    let rUser1 = {
        route: {
            _id: "1",
            startLocation: {
                lat: -25.7542357,
                lng: 28.249907200000052
            },
            endLocation: {
                lat: -25.7868836,
                lng: 28.314048800000023
            }
        },
        user: {
            _id: "1"
        }
    }

    // Hatfield to Brooklyn
    let rUser2 = {
        route: {
            _id: "2",
            startLocation: {
                lat: -25.7487333,
                lng: 28.238043199999993
            },
            endLocation: {
                lat: -25.7649847,
                lng: 28.23804319999999
            }
        },
        user: {
            _id: "2"
        }
    }
    // Hillcrest to Menlo Park
    let rUser3 = {
        route: {
            _id: "3",
            startLocation: {
                lat: -25.7563356,
                lng: 28.23731220000002
            },
            endLocation: {
                lat: -25.7698511,
                lng: 28.25997140000004
            }
        },
        user: {
            _id: "3"
        }
    }

    // Lynwood to Ashlea Gardens
    let rUser4 = {
        route: {
            _id: "4",
            startLocation: {
                lat: -25.7642508,
                lng: 28.267280099999994
            },
            endLocation: {
                lat: -25.7826832,
                lng: 28.26654929999995
            }
        },
        user: {
            _id: "4"
        }
    }
    let rUsers = [rUser1, rUser2, rUser3, rUser4];

    // let AI = new routeTree(obj, obj[0].user._id);
    let AI = new routeTree(rUsers, rUsers[0].user._id);
    let out = AI.calcOptimalRoute();
    console.log(out);
}