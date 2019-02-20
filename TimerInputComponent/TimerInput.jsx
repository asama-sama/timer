import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'semantic-ui-react';

class TimerInput extends Component {

  constructor(props) {
    super(props);
    this.onEnterAddTimer = this.onEnterAddTimer.bind(this);
    this.state = {newTimerInput: ''};
  }

  onEnterAddTimer(addTimer, e) {
    if(e.key == 'Enter') {
      addTimer(this.state.newTimerInput);
    }
  }

  updateNewTimerInput(newTimerInput) {
    this.setState({newTimerInput});
  }

  render() {
    const newTimerInput = this.state.newTimerInput;
    const addTimer = this.props.addTimer;
    return(
      <div className="Timer">
        <input
          type="text"
          name="newTimer" 
          value={newTimerInput} 
          onChange={e => this.updateNewTimerInput(e.target.value)}
          onKeyPress={e => this.onEnterAddTimer(addTimer, e)}
        />
        <Icon name='unhide' onClick={this.props.unhideTimers}/>
      </div>);
  }
}
TimerInput.propTypes = {
  addTimer: PropTypes.func.isRequired,
  unhideTimers: PropTypes.func.isRequired
};
export default TimerInput;