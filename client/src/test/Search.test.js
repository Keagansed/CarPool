import React from 'react';
import Search from '../js/components/Search';
let renderer = require('react-test-renderer');

describe('Search Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
