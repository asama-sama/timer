import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './DatePicker.css';
import moment from 'moment';

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName='DatePicker'>
        <Icon name='angle left' onClick={() => this.props.subtractDay()} />
        <span>
          {moment(this.props.date).format('ddd Do MMM YYYY')}
        </span>
        <Icon name='angle right' onClick={() => this.props.addDay()} />
      </div>);
  }
}
DatePicker.propTypes = {
  date: PropTypes.any.isRequired,
  subtractDay: PropTypes.func.isRequired,
  addDay: PropTypes.func.isRequired
};
export default DatePicker;