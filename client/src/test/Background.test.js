import React from 'react';
// import ReactDOM from 'react-dom';
import Background from '../js/components/Background';
import { shallow } from 'enzyme';


describe('Background Component', () => {
  it('renders correctly', () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<Background />, div);
    // ReactDOM.unmountComponentAtNode(div);

    expect(shallow(<Background />).exists(<div className="Background"></div>)).toBe(true);
  });
});
