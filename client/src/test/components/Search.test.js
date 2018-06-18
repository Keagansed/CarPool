import React from 'react';
import Search from '../../js/components/Search';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Search Component', () => {
    let container;

    beforeEach(() => {
      container = shallow(<Search />);
    });

    it('captures snapshot', () => {
      const renderedValue = renderer.create(<Search />).toJSON();
      expect(renderedValue).toMatchSnapshot();
    });
    
    it ('renders correctly', () => {
      expect(container.length).toEqual(1);
    });
});
