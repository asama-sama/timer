import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class TimerDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {refreshClock: true};
    this.formatTime = this.formatTime.bind(this);
  }

  formatTime(time) {
    return moment(time).format('hh:mm:ss');
  }

  render() {
    return(
      <div>
        <span>{this.formatTime(this.props.start)} </span>-
        <span> {this.formatTime(this.props.end)}</span>
      </div>
    );
  }
}
TimerDisplay.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string
};
export default TimerDisplay;