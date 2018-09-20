import React from 'react';
import Register from '../../js/containers/RegisterPage';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'

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

    signUp = () => {
        
        if(this.sPass1 === this.sPass2) {
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
        container = shallow(<Register store={mockStore} />);
        instance = container.instance();
    });
    
    it('captures snapshot', () => {
        const renderedValue = renderer.create(<Register store={mockStore} />).toJSON();
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
        const event = {target: {value: "9311179351087"}};
        expect(instance.state.idNum).toEqual('');
        instance.updateSignUpIDValue(event);
        expect(instance.state.idNum).toEqual("9311179351087");
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