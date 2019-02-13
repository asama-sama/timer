import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimerDisplay from '../TimerDisplayComponent/TimerDisplay';
import './Category.css';

class Category extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      refreshClock: true};
    this.sumTimers = this.sumTimers.bind(this);
    this.isStartDisabled = this.isStartDisabled.bind(this);
  }

  tick() {
    this.setState({refreshClock: !this.state.refreshClock});
  }

  formatTimeForSeconds(seconds) {
    let hours = parseInt(seconds/3600);
    hours = hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    seconds = seconds%3600;
    
    let minutes = parseInt(seconds/60);
    minutes = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    seconds = seconds%60;
    
    seconds = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    let timeString = `${hours}:${minutes}:${seconds}`;
    return timeString;
  }

  sumTimers() {
    let seconds = this.props.timers.reduce( (acc, curr) => {
      return moment(curr.end).diff(moment(curr.start), 'seconds') + acc;
    }, 0);
    return this.formatTimeForSeconds(seconds);
  }

  /**
   * Returns true if start button should be disabled
   */
  isStartDisabled() {
    return this.props.timers.map(timer => {
      return (
        !!timer.start && !!timer.end 
        || !timer.start && !timer.end);
    }).reduce( (acc, curr) => {
      return curr && acc;
    }, true);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    let timers;
    if(this.props.timers !== undefined) {
      timers = <div>{this.props.timers.map( (timer, idx) => {
        return (
          <div key={idx}>
            <TimerDisplay {...timer}></TimerDisplay>
          </div>);
      })}</div>;
    } else {
      timers = <div />;
    }

    return (
      <div styleName='Category'>
        <div>
          <span styleName='Category-Text'>{this.props.name}</span>
          <span>{this.sumTimers()}</span>
          <Button.Group>
            <Button disabled={!this.isStartDisabled()} color='green' onClick={this.props.startTimer}>start</Button>
            <Button disabled={this.isStartDisabled()} color='red' onClick={this.props.stopTimer}>stop</Button>
          </Button.Group>
        </div>
        {timers}
      </div>
    );
  }
}
Category.propTypes = {
  name: PropTypes.string.isRequired,
  timers: PropTypes.array,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired
};
export default Category;