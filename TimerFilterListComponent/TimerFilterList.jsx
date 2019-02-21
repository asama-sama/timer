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
        />
        <TimerListContainer 
          filter={this.state.timerInput}
          timers={this.props.timers}
        />
      </div>
    );
  }
}
TimerFilterList.propTypes = {
  timers: PropTypes.array.isRequired
};
export default TimerFilterList;