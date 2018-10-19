import React from 'react';
import Register from '../../js/containers/RegisterPage';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom';

class MockStore {
    token = null; 
    loggedIn = false; 
    registered = false; 
    lemail = ''; 
    lpassword = '';
    sFName = '';
    sLName = '';
    semail = '';
    sPassword1 = '';
    sPassword2 = '';
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

    signUp = () => {
        
        if(this.sPassword1 === this.sPassword2) {
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

describe('Register Component', () => {
    let mockStore, container, instance;
    
    beforeAll(() => {
        mockStore = new MockStore();
        container = shallow(<MemoryRouter><Register store={mockStore} /></MemoryRouter>);
        instance = container.dive().dive().dive().instance();
    });
    
    it('captures snapshot', () => {
        const renderedValue = renderer.create(<MemoryRouter><Register store={mockStore} /></MemoryRouter>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
  
    it('renders correctly', () => {
        expect(container.length).toEqual(1);
    });

    it('updates sign up first name correctly', () => {
        const event = {target: {value: "test"}};
        expect(instance.state.fName).toEqual('');
        instance.updateSignUpfNameValue(event);
        expect(instance.state.fName).toEqual("test");
    });

    it('updates sign up last name correctly', () => {
        const event = {target: {value: "tester"}};
        expect(instance.state.lName).toEqual('');
        instance.updateSignUplNameValue(event);
        expect(instance.state.lName).toEqual("tester");
    });

    it('updates sign up email correctly', () => {
        const event = {target: {value: "test@email.com"}};
        expect(instance.state.email).toEqual('');
        instance.updateSignUpEmailValue(event);
        expect(instance.state.email).toEqual("test@email.com");
    });

    it('updates sign up ID correctly', () => {
        const event = {target: {value: "9806237941084"}};
        expect(instance.state.idNum).toEqual('');
        instance.updateSignUpIDValue(event);
        expect(instance.state.idNum).toEqual("9806237941084");
    });

    it('updates first sign up password correctly', () => {
        const event = {target: {value: "1234"}};
        expect(instance.state.password1).toEqual('');
        instance.updateSignUpPasswordValue1(event);
        expect(instance.state.password1).toEqual("1234");
    });

    it('updates second sign up password correctly', () => {
        const event = {target: {value: "1234"}};
        expect(instance.state.password2).toEqual('');
        instance.updateSignUpPasswordValue2(event);
        expect(instance.state.password2).toEqual("1234");
    });

    it('handles sign up correctly', () => {
        const event = {preventDefault: function() {}};
        expect(instance.props.store.registered).toEqual(false);
        instance.state.checked = true;
        instance.handleSignup(event);
        expect(instance.props.store.registered).toEqual(true);
    });

    it('checks state variables correctly before submitting', () => {
        expect(instance.canBeSubmitted()).toEqual(true);
    });

    it('checks invalid state variables correctly before submitting', () => {
        instance.state.email = "notavalidemailaddress";
        expect(instance.canBeSubmitted()).toEqual(false);
    });
});