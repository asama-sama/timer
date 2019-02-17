import React from 'react';
import PropTypes from 'prop-types';

const onEnterAddTimer = (addTimer, e) => {
  if(e.key == 'Enter') {
    addTimer(e.target.value);
  }
};

const TimerInput = ({newTimerInput, updateNewTimerInput, addTimer}) => (
  <div className="Timer">
    <input
      type="text" name="newTimer" 
      value={newTimerInput} 
      onChange={e => updateNewTimerInput(e.target.value)}
      onKeyPress={e => onEnterAddTimer(addTimer, e)}/>
  </div>
);

TimerInput.propTypes = {
  newTimerInput: PropTypes.string.isRequired,
  updateNewTimerInput: PropTypes.func.isRequired,
  addTimer: PropTypes.func.isRequired
};
export default TimerInput;