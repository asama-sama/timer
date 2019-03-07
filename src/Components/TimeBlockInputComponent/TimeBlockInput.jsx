import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimeField from 'react-simple-timefield';
import { getTimeFormat as uGetTimeFormat } from '../../utils';
import './TimeBlockInput.css';

class TimeBlockInput extends Component {
  constructor(props) {
    super(props);
    this.formatTime = this.formatTime.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onTimeInputChange = this.onTimeInputChange.bind(this);
    this.getTimeFormat = this.getTimeFormat.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.enableTimeModify = this.enableTimeModify.bind(this);

    const { input } = this.props;

    this.state = {
      time: input,
      showSeconds: true,
      modify: false
    };
  }

  onEnter(e) {
    const { updateTimeBlock } = this.props;
    const { time } = this.state;
    if (e.key === 'Enter') {
      this.setState({
        modify: false
      });
      updateTimeBlock(time);
    }
  }

  // timestamp format hh:mm:ss
  onTimeInputChange(timestamp) {
    const { time } = this.state;
    const currTime = moment(time);
    const mTimestamp = moment(timestamp, this.getTimeFormat());
    currTime
      .set('hour', mTimestamp.hour())
      .set('minute', mTimestamp.minute())
      .set('second', mTimestamp.second());
    this.setState({ time: currTime.format() });
  }

  getTimeFormat() {
    const { showSeconds, time } = this.state;
    const { calendarDate } = this.props;
    let format = uGetTimeFormat(showSeconds);

    const mCalendarDate = moment(calendarDate);
    const timeInput = moment(time);
    if (!timeInput.isSame(mCalendarDate, 'day')) {
      format += ', Do MMM';
    }
    return format;
  }

  formatTime(time) {
    return moment(time).format(this.getTimeFormat());
  }

  resetInput() {
    const { input } = this.props;
    this.setState({
      time: input,
      modify: false
    });
  }

  // do not allow currently running timers to be modified
  enableTimeModify() {
    const { time } = this.state;
    if (time) {
      this.setState({ modify: true });
    }
  }

  render() {
    const { modify, time, showSeconds } = this.state;
    return (
      <span styleName='TimeBlockInput'>
        {modify
          ? (
            <TimeField
              value={this.formatTime(time)
                || moment().format(this.getTimeFormat())}
              onChange={this.onTimeInputChange}
              onKeyPress={this.onEnter}
              input={
                (
                  <input
                    type='text'
                    autoFocus
                    styleName='TimeBlockInput-Modify'
                    onBlur={this.resetInput}
                  />
                )
              }
              showSeconds={showSeconds}
              ref={this.inputRef}
            />
          )
          : (
            <span
              onClick={this.enableTimeModify}
              styleName='TimeBlockInput-Display'
            >
              {this.formatTime(time)}
            </span>
          )
        }
      </span>
    );
  }
}
TimeBlockInput.propTypes = {
  input: PropTypes.string.isRequired,
  updateTimeBlock: PropTypes.func.isRequired,
  calendarDate: PropTypes.string.isRequired
};
export default TimeBlockInput;
