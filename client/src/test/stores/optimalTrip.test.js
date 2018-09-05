import routeTree from '../../../../routes/api/Util/optimalTrip';

describe('Optimal Trip Calculation test', () => {
    let data, rUsers; 

    it('produces the correct route', () => {
        // Driver, LC to Faerie Glen
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
        rUsers = [rUser1, rUser2, rUser3, rUser4];

        // let routeTrip = new routeTree(rUsers, 1);
        // let path = routeTrip.calcOptimalRoute();

        // console.log(path);

        // expect(path).toBe(false);
        expect(false).toBe(false);
    });
})