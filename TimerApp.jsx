import React, {Component} from 'react';
import TimerInputContainer from './containers/TimerInputContainer';
import TimerContainer from './Containers/TimerContainer';
import moment from 'moment';
import PropTypes from 'prop-types';

class TimerApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      newTimer: '',
    };
    this.updateNewTimer = this.updateNewTimer.bind(this);
    this.onEnterNewTimer = this.onEnterNewTimer.bind(this);
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

  render() {
    return (
      <div>
        <div className="Categories">
          {this.props.timers.map(timer => {
            return (
              <TimerContainer key={timer.name}
                {...timer}
              />);
          })}
        </div>
        <TimerInputContainer
          newTimer={this.state.newTimer}
          updateNewTimer={this.updateNewTimer}
          onEnterNewTimer={this.onEnterNewTimer}
        />
      </div>
    );
  }
}
TimerApp.propTypes = {
  timers: PropTypes.any.isRequired,
  activeTimer: PropTypes.string.isRequired
};

export default TimerApp;