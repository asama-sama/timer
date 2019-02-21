import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimeField from 'react-simple-timefield';

class TimeBlockInput extends Component {
  constructor(props) {
    super(props);
    this.formatTime = this.formatTime.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onTimeInputChange = this.onTimeInputChange.bind(this);
    this.getTimeFormat = this.getTimeFormat.bind(this);

    this.state = {
      time: this.props.input,
      refreshClock: true,
      shouldUpdate: false,
      showSeconds: true
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

  formatTime(time) {
    return moment(time).format(this.getTimeFormat());
  }

  onEnter(e) {
    if(e.key==='Enter') {
      this.setState({shouldUpdate: true});
      this.props.updateTimeBlock(this.state.time);
    }
  }

  getTimeFormat() {
    if(this.state.showSeconds) {
      return 'HH:mm:ss';
    } else {
      'HH:mm';
    }
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

    return (<TimeField
      value={this.formatTime(this.state.time) 
        || moment().format(this.getTimeFormat())}
      onChange={this.onTimeInputChange}
      onKeyPress={this.onEnter}
      style={{
        border: 'none',
        borderBottom: '1px solid rgb(224, 224, 224)',
        width: '50px',
        textAlign: 'center',
        margin: '5px',
        marginTop: 0
      }}
      showSeconds={this.state.showSeconds}
    />);
  }
}
TimeBlockInput.propTypes = {
  input: PropTypes.any,
  id: PropTypes.string.isRequired,
  updateTimeBlock: PropTypes.func.isRequired
};
export default TimeBlockInput;