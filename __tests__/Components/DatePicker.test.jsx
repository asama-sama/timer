import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from '../../src/Components/DatePickerComponent/DatePicker';

it('renders correctly', () => {
  const tree = renderer
    .create(<DatePicker
      date=''
      subtractDay={() => {}}
      addDay={() => {}}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
