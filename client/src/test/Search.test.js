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
});
