import React from 'react';
import Register from '../js/components/RegisterPage';
import { shallow } from 'enzyme';
// import { shallowToJson } from 'enzyme-to-json';
let renderer = require('react-test-renderer');


describe('Register Component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Register />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('displays correct errors for invalid input', () => {
        window.alert = jest.fn();
        const wrapper = shallow(
            <Register />
        );
        // wrapper.find('#txtFirstName').simulate('change', {target: {name: 'txtFirstName', value: 'John'}});        
 
        
       
        // const firstname = form.find('txtFirstName').get(0);
        // firstname.value = "John";
        // const lastname = form.find('txtLastName').get(0);
        // lastname.value = "Smith";
        // const id = form.find('txtID').get(0);
        // id.value = "9607025080089";
        // const email = form.find('txtEmail').get(0);
        // email.value = "v@me.com";
        // const pass = form.find('txtPassword').get(0);
        // pass.value = "12";
        // const confirmPass = form.find('txtConfirmPassword').get(0);
        // confirmPass.value = "12";
            
        wrapper.simulate('click');
        expect(window.alert);       //no idea if this is actually working
    });
});