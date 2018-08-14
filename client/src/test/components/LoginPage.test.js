import React from 'react';
import LoginPage from '../../js/containers/LoginPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

class MockStore {
    token = null; 
    loggedIn = false; 
    registered = false; 
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
            alert("Passwords do not match");
        }else{
            alert("Successfully signed up");
            this.setRegistered(true);
        }
    };

    authenticate = () => {
        this.setRegistered(false);
        this.setToken("testtoken123");
        this.setLoggedIn(true);
    }

    logout = () => {
        this.setLoggedIn(false);
        this.setToken('');
    }

}

describe('Login Page Component', () => {
    let container, instance;
    const mockStore = new MockStore();
    const loginPage = new LoginPage();

    beforeAll(() => {
        container = shallow(<LoginPage store={mockStore} />);
        instance = container.instance();
    });

    it('captures snapshot', () => {
        const renderedValue = renderer.create(<LoginPage store={mockStore} />).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });

    it('renders correctly', () => {
        expect(container.length).toEqual(1)
    });

    it('toggles visibility correctly', () => {
        const event = {};
        expect(instance.state.toggle).toEqual(false);
        instance.toggle(event);
        expect(instance.state.toggle).toEqual(true);
        instance.toggle(event);
        expect(instance.state.toggle).toEqual(false);
    });

    // it('updates login email value correctly', () => {
    //     const event = {target: {value: "test@email.com"}};
    //     expect(instance.props.store.lemail).toEqual('');
    //     instance.updateLoginEmailValue(event);
    //     expect(instance.props.store.lemail).toEqual("test@email.com");
    // })

    // it('updates login password value correctly', () => {
    //     const event = {target: {value: "1234"}};
    //     expect(instance.props.store.lpassword).toEqual('');
    //     instance.updateLoginPasswordValue(event);
    //     expect(instance.props.store.lpassword).toEqual("1234");
    // })
});