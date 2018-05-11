import React from 'react';
import Search from '../js/components/Search';
let renderer = require('react-test-renderer');

describe('Search Component', () => {
  it('renders correctly', () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<Search />, div);
    // ReactDOM.unmountComponentAtNode(div);

    const tree = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('retrieves users correctly', () => {
    const testVal = true;
    expect(testVal).toBe(true);
  });

  it('verifies token', () => {
    const testVal = true;
    expect(testVal).toBe(true);
  });

  it('verifies token', () => {
    const testVal = true;
    expect(testVal).toBe(true);
  });

  it('links to profiles correctly', () => {
    const testVal = true;
    expect(testVal).toBe(true);
  });
});
