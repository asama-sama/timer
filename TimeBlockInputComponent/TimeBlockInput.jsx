import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimeField from 'react-simple-timefield';
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

    this.state = {
      time: this.props.input,
      refreshClock: true,
      shouldUpdate: false,
      showSeconds: true,
      modify: false
    };
  }

  componentDidUpdate(){
    if(this.state.shouldUpdate) {
      this.setState({
        time: this.props.input,
        shouldUpdate: false
      });
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({refreshClock: !this.state.refreshClock});
  }

  resetInput() {
    this.setState({
      time: this.props.input,
      modify: false
    });
  }

  formatTime(time) {
    return moment(time).format(this.getTimeFormat());
  }

  onEnter(e) {
    if(e.key==='Enter') {
      this.setState({
        shouldUpdate: true,
        modify: false
      });
      this.props.updateTimeBlock(this.state.time);
    }
  }

  // do not allow currently running timers to be modified
  enableTimeModify() {
    if(this.state.time) {
      this.setState({modify: true});
    }
  }

  getTimeFormat() {
    let format;
    if(this.state.showSeconds) {
      format = 'HH:mm:ss';
    } else {
      format = 'HH:mm';
    }
    let calendarDate = moment(this.props.calendarDate);
    let timeInput = moment(this.state.time);
    if(!timeInput.isSame(calendarDate, 'day')) {
      format += ', Do MMM';
    }
    return format;
  }

  // timestamp format hh:mm:ss
  onTimeInputChange(timestamp) {
    let currTime = moment(this.state.time);
    let mTimestamp = moment(timestamp, this.getTimeFormat());
    currTime
      .set('hour', mTimestamp.hour())
      .set('minute', mTimestamp.minute())
      .set('second', mTimestamp.second());
    this.setState({time: currTime.format()});
  }

  render() {
    return (
      <span styleName='TimeBlockInput'>
        {this.state.modify ?
          <TimeField
            value={this.formatTime(this.state.time) 
              || moment().format(this.getTimeFormat())}
            onChange={this.onTimeInputChange}
            onKeyPress={this.onEnter}
            input={<input 
              type='text'
              autoFocus
              styleName='TimeBlockInput-Modify'
              onBlur={this.resetInput}
            />}
            showSeconds={this.state.showSeconds}
            ref={this.inputRef}
          />
          :
          <span
            onClick={this.enableTimeModify}
          >
            {this.formatTime(this.state.time)}
          </span>
        }
      </span>
    );
  }
}
TimeBlockInput.propTypes = {
  input: PropTypes.any,
  id: PropTypes.string.isRequired,
  updateTimeBlock: PropTypes.func.isRequired,
  calendarDate: PropTypes.any.isRequired
};
export default TimeBlockInput;