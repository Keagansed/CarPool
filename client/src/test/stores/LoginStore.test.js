import LoginStore from '../../js/stores/LoginStore';

describe('Login Store test functions', () => {
    let data, values;
    it ('updates token correctly', () => {
        LoginStore.setToken('123');
        expect(LoginStore.token).toEqual('123');
        LoginStore.setToken('');
    });

    it ('initializes loggedIn variables corrrectly', () => {
        data = {
            loggedIn : LoginStore.loggedIn,
            lEmail : LoginStore.lEmail,
            lPassword : LoginStore.lPassword
        };

        values = {
            loggedIn : false,
            lEmail : '',
            lPassword : ''
        };
        expect(data).toEqual(values);
    });

    it ('updates loggedIn variables correctly', () => {
        values = {
            loggedIn : true,
            lEmail : '',
            lPassword : ''
        };

        LoginStore.setLoggedIn(true);

        data = {
            loggedIn : LoginStore.loggedIn,
            lEmail : LoginStore.lEmail,
            lPassword : LoginStore.lPassword
        };

        expect(data).toEqual(values);
    });

    it ('initializes registered correctly', () => {
        expect(LoginStore.registered).toEqual(false);
    });

    it ('updates registered correctly', () => {
        LoginStore.setRegistered(true);
        expect(LoginStore.registered).toEqual(true);
    });

    it ('signs up correctly', () => {
        LoginStore.sFName = 'Testy';
        LoginStore.sLName = 'Mc Test Face';
        LoginStore.sEmail = 'tester@test.com';
        LoginStore.sId = '9311251585081';
        LoginStore.sPassword1 = '12';
        LoginStore.sPassword2 = '12';

        LoginStore.signUp();

        expect(LoginStore.registered).toEqual(true);

    });

    it ('is logged in after signing up', () => {
        expect(LoginStore.loggedIn).toEqual(true);
    });

    it ('does not authenticate with false email', () => {
        LoginStore.setLoggedIn(false);
        LoginStore.lEmail = 'falseemail';
        LoginStore.lPassword = '12';
        LoginStore.authenticate();

        expect(LoginStore.loggedIn).toEqual(false);
    });

    it ('does not authenticate with false password', () => {
        LoginStore.setLoggedIn(false);
        LoginStore.lEmail = 'tester@test.com';
        LoginStore.lPassword = '12';
        LoginStore.authenticate();

        expect(LoginStore.loggedIn).toEqual(false);
    });
});