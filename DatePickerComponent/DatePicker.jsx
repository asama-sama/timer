import React, {Component} from 'react';
import moment from 'moment';
import './DatePicker.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        styleName='DatePicker'>
        {moment().format('ddd Do MMM YYYY')}
      </div>);
  }
}
export default DatePicker;