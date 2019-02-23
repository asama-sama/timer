import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class TimerInput extends Component {

  constructor(props) {
    super(props);
    this.onEnterAddTimer = this.onEnterAddTimer.bind(this);
  }

  onEnterAddTimer(addTimer, e) {
    if(e.key == 'Enter') {
      addTimer(this.props.timerInput);
      this.props.updateTimerInput('');
    }
  }

  render() {
    const newTimerInput = this.props.timerInput;
    const addTimer = this.props.addTimer;
    return(
      <div className="Timer" style={{textAlign: 'center'}}>
        <Input
          type="text"
          name="newTimer" 
          size="mini"
          autoComplete='off'
          placeholder='Add or search timers...'
          value={newTimerInput} 
          icon='clock'
          iconPosition='left'
          onChange={e => this.props.updateTimerInput(e.target.value)}
          onKeyPress={e => this.onEnterAddTimer(addTimer, e)}
          action={{
            icon: 'add', 
            color: 'blue',
            onClick: () => this.onEnterAddTimer(addTimer, {key: 'Enter'})
          }}
        />
      </div>);
  }
}
TimerInput.propTypes = {
  addTimer: PropTypes.func.isRequired,
  updateTimerInput: PropTypes.func.isRequired,
  timerInput: PropTypes.string.isRequired
};
export default TimerInput;