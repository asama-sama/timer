import React, {Component} from 'react';
import TimerInput from './TimerInputComponent/TimerInput';
import Timer from './TimerComponent/Timer';
import moment from 'moment';

class TimerApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      timers: [{
        name: 'groovin\'',
        timeBlocks: []
      }, {
        name: 'whatevs',
        timeBlocks: []
      }],
      newTimer: '',
      activeTimer: ''
    };
    this.updateNewTimer = this.updateNewTimer.bind(this);
    this.onEnterNewTimer = this.onEnterNewTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateActiveTimer = this.updateActiveTimer.bind(this);
  }

  updateActiveTimer(name) {
    this.setState({activeTimer: name});
  }

  updateNewTimer(e) {
    this.setState({newTimer: e.target.value});
  }

  onEnterNewTimer(e) {
    if(e.key == 'Enter') {
      let newTimer = e.target.value.trim();
      if(newTimer !== '') {

        let cat = this.getTimerForName(newTimer);
        if(cat !== undefined && cat.name == newTimer) {
          throw new Error(`Timer: ${cat.name} already exists`);
        }
        

        let newCategories = Object.assign( 
          this.state.timers, {});
        newCategories.push({
          name: e.target.value,
          timeBlocks: []
        });

        this.setState({timers: newCategories});
        this.setState({newTimer: ''});
      }
    }
  }

  getTimerForName(name) {
    return this.state.timers.find(cat => cat.name === name);
  }

  updateTimerForName(name, timer) {
    let timers = Object.assign(this.state.timers, {});
    timers.map(t => {
      if(t.name === name) {
        return timer;
      } else {
        return t;
      }
    });
    this.setState({timers: timers});
  }

  /**
   * Adds a new start timer if none is running for this category
   * @param  {string} name [name of category]
   */
  startTimer(name) {
    // create the new timer
    let timer = this.getTimerForName(name);
    if(timer.timeBlocks === undefined) {
      timer.timeBlocks = [];
    }
    // check no unfinished timeBlocks on this timer
    for(let timer of timer.timeBlocks) {
      if(timer.start !== undefined && timer.end === undefined) {
        throw Error(`There is an unfinished timer for ${name}`);
      }
    }
    // stop all other timeBlocks
    let timers = this.state.timers.map(cat => {
      if(
        cat.name !== name &&
        cat.end === undefined) {
        this.stopTimer(cat.name);
      }
    });
    this.setState({timers: timers});

    // create new timeBlock and add to the array
    let timeBlock = {
      start: moment().format(),
    };
    timer.timeBlocks.push(timeBlock);
    this.updateTimerForName(name, timer);
    this.updateActiveTimer(name);
  }

  /**
   * Stops any running timer on this timer
   * @param  {string} name [name of timer]
   */
  stopTimer(name) {
    let timer = this.getTimerForName(name);
    for(let timer of timer.timeBlocks) {
      if(timer.start !== undefined && timer.end === undefined) {
        timer.end = moment().format();
        break;
      }
    }
    this.updateTimerForName(name, timer);
    this.updateActiveTimer('');
  }

  render() {
    return (
      <div>
        <div className="Categories">
          {this.state.timers.map(timer => {
            return (
              <Timer key={timer.name}
                startTimer={()=>this.startTimer(timer.name)}
                stopTimer={()=>this.stopTimer(timer.name)}
                activeTimer={this.state.activeTimer}
                {...timer}
              />);
          })}
        </div>
        <TimerInput
          newTimer={this.state.newTimer}
          updateNewTimer={this.updateNewTimer}
          onEnterNewTimer={this.onEnterNewTimer}
        />
      </div>
    );
  }
}

export default TimerApp;