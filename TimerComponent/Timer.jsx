import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimerDisplay from '../TimerDisplayComponent/TimerDisplay';
import './Timer.css';

class Timer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      refreshClock: true};
    this.sumTimers = this.sumTimers.bind(this);
    this.isTimerActive = this.isTimerActive.bind(this);
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
    let seconds = this.props.timeBlocks.reduce( (acc, curr) => {
      return moment(curr.end).diff(moment(curr.start), 'seconds') + acc;
    }, 0);
    return this.formatTimeForSeconds(seconds);
  }

  isTimerActive() {
    return this.props.name===this.props.activeTimer;
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
    let name = this.props.name;
    let timeBlocks;
    if(this.props.timeBlocks !== undefined) {
      timeBlocks = <div>{this.props.timeBlocks.map( (timer, idx) => {
        return (
          <div key={idx}>
            <TimerDisplay {...timer} active={this.isTimerActive()}></TimerDisplay>
          </div>);
      })}</div>;
    } else {
      timeBlocks = <div />;
    }

    return (
      <div styleName='Timer'>
        <div>
          <span styleName='Timer-Text'>{name}</span>
          <span styleName={this.isTimerActive() ? 'Timer-Sumtime': ''}>{this.sumTimers()}</span>
          <div styleName='Timer-Buttons'>
            <Button.Group size='tiny' styleName=''>
              <Button
                disabled={name === this.props.activeTimer}
                color='green' 
                onClick={() => this.props.startTimer(name)}>
                  start
              </Button>
              <Button 
                disabled={name !== this.props.activeTimer} 
                color='red' 
                onClick={()=>this.props.stopTimer(name)}>
                stop
              </Button>
            </Button.Group>
          </div>
        </div>
        {timeBlocks}
      </div>
    );
  }
}
Timer.propTypes = {
  name: PropTypes.string.isRequired,
  timeBlocks: PropTypes.array,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  activeTimer: PropTypes.string.isRequired
};
export default Timer;