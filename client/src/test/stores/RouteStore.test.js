import RouteStore from '../../js/stores/RouteStore';

describe ('Route Store test functions', () => {
    let data, values, routes;
    // Route Store has a constructor, therefore an object needs to be created
    beforeEach(() => {
        routes = new RouteStore('','','',{},'',false);
    });
    
    it ('initializes correctly with given values', () => {
        values = {
            routeName : '',
            startLocation : '',
            endLocation : '',
            days : {},
            time : '',
            repeat : false
        };
        data = {
            routeName : routes.routeName,
            startLocation : routes.startLocation,
            endLocation : routes.endLocation,
            days : routes.days,
            time : routes.time,
            repeat : routes.repeat
        };

        expect(data).toEqual(values);
    });

    it ('changes routeName', () => {
        routes.setRouteName('TheTestRoute');
        expect(routes.routeName).toEqual('TheTestRoute');
    });

    it ('changes startLocation', () => {
        routes.setStartLocation('Here');
        expect(routes.startLocation).toEqual('Here');
    });

    it ('changes endLocation', () => {
        routes.setEndLocation('There');
        expect(routes.endLocation).toEqual('There');
    });

    it ('changes days', () => {
        values = {
            Monday : true,
            Tuesday : true,
            Wednesday : true,
            Thursday : false,
            Friday : true,
            Saturday : false,
            Sunday : false 
        };

        routes.setDays(values);
        expect(routes.days).toEqual(values);
    });

    it ('changes time', () => {
        routes.setTime('08:00');
        expect(routes.time).toEqual('08:00');
    });

    it ('changes repeat', () => {
        routes.setRepeat(true);
        expect(routes.repeat).toEqual(true);
    });
});