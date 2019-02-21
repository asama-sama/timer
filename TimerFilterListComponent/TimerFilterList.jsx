import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimerListContainer from '../containers/TimerListContainer';
import TimerInputContainer from '../containers/TimerInputContainer';

class TimerFilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {timerInput: ''};
    this.updateTimerInput = this.updateTimerInput.bind(this);
  }

  updateTimerInput(timerInput) {
    this.setState({timerInput});
  }

  render() {
    return (
      <div>
        <TimerInputContainer
          timerInput={this.state.timerInput} 
          updateTimerInput={this.updateTimerInput}
          date={this.props.date}
        />
        <TimerListContainer 
          filter={this.state.timerInput}
          timers={this.props.timers}
          date={this.props.date}
        />
      </div>
    );
  }
}
TimerFilterList.propTypes = {
  timers: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired
};
export default TimerFilterList;