import React from 'react';
import PropTypes from 'prop-types';

const onEnterAddTimer = (addTimer, e) => {
  if(e.key == 'Enter') {
    addTimer(e.target.value);
  }
};

const TimerInput = ({newTimer, updateNewTimer, addTimer}) => (
  <div className="Timer">
    <input
      type="text" name="newTimer" 
      value={newTimer} 
      onChange={updateNewTimer}
      onKeyPress={e => onEnterAddTimer(addTimer, e)}/>
  </div>
);

TimerInput.propTypes = {
  newTimer: PropTypes.string.isRequired,
  updateNewTimer: PropTypes.func.isRequired,
  addTimer: PropTypes.func.isRequired
};
export default TimerInput;