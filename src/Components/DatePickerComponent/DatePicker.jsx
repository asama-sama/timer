import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './DatePicker.css';
import moment from 'moment';

const DatePicker = props => {
  const { subtractDay, date, addDay } = props;
  return (
    <div styleName='DatePicker'>
      <Icon
        name='angle left'
        styleName='DatePicker-Arrow DatePicker-Arrow-Left'
        onClick={() => subtractDay()}
      />
      <span styleName='DatePicker-Text'>
        {moment(date).format('ddd Do MMM YYYY')}
      </span>
      <Icon
        name='angle right'
        styleName='DatePicker-Arrow DatePicker-Arrow-Right'
        onClick={() => addDay()}
      />
    </div>
  );
};
DatePicker.propTypes = {
  date: PropTypes.string.isRequired,
  subtractDay: PropTypes.func.isRequired,
  addDay: PropTypes.func.isRequired
};
export default DatePicker;
