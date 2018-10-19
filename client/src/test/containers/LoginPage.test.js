import React from 'react';
import Login from '../../js/containers/LoginPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    token = null; 
    loggedIn = false; 
    registered = false; 
    toggleError = false;
    lemail = ''; 
    lpassword = '';
    sFName = '';
    sLName = '';
    semail = '';
    sPass1 = '';
    sPass2 = '';
    sId = '';

    setToken = (token) => {
        this.token = token;
    };

    setLoggedIn = (success) => {
        this.loggedIn = success;
        this.lemail = '';
        this.lpassword = '';
    };

    setRegistered = (val) => {
        this.registered = val;
    };

    signup = () => {
        
        if(this.sPass1 !== this.sPass2) {
            console.log("Passwords do not match");
        }else{
            console.log("Successfully signed up");
            this.setRegistered(true);
        }
    };

    authenticate = () => {
        this.setRegistered(false);
        this.setToken("testtoken123");
        this.setLoggedIn(true);
    };

    logout = () => {
        this.setLoggedIn(false);
        this.setToken('');
    };

}

describe('Login Page Component', () => {
    let container, instance;
    const mockStore = new MockStore();

    beforeAll(() => {
        container = shallow(<Login store={mockStore} />);
        instance = container.dive().instance();
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><Login store={mockStore} /></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });

    it('updates login email value correctly', () => {
        const event = {target: {value: "test@email.com"}};
        expect(instance.state.email).toEqual('');
        instance.updateLoginEmailValue(event);
        expect(instance.state.email).toEqual("test@email.com");
    });

    it('updates login password value correctly', () => {
        const event = {target: {value: "1234"}};
        expect(instance.state.password).toEqual('');
        instance.updateLoginPasswordValue(event);
        expect(instance.state.password).toEqual("1234");
    });

    it('checks correct state variables correctly', () => {
        expect(instance.canBeSubmitted()).toEqual(true);
    });

    it('check state variables correctly with incorrect email', () => {
        instance.state.email = "invalidemail";
        expect(instance.canBeSubmitted()).toEqual(false);
    });

    it('check state variables correctly with incorrect password', () => {
        instance.state.email = "test@email.com";
        instance.state.password = "";
        expect(instance.canBeSubmitted()).toEqual(false);
    });
});