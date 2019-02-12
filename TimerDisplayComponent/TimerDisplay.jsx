import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

class TimerDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {refreshClock: true};
  }

  getTime(start, end) {
    let mStart = moment(start);
    let mEnd = moment(end);
    return mEnd.diff(mStart, 'seconds');
  }

  tick() {
    this.setState({refreshClock: !this.state.refreshClock});
    if(this.props.start !== undefined && this.props.end !== undefined) {
      clearInterval(this.timerId);
    }
  }

  componentDidMount() {
    if(this.props.start !== undefined && this.props.end === undefined) {
      this.timerId = setInterval(
        () => this.tick(),
        1000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return(
      <div>
        <span>{this.getTime(this.props.start, this.props.end)}</span>
      </div>
    );
  }
}
TimerDisplay.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string
};
export default TimerDisplay;