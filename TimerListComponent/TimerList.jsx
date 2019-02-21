import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './TimerList.css';

const TimerList = ({timers, unhideTimer, date}) => (
  <div>
    {timers.map(timer => 
      <div key={timer.name}>
        <Icon 
          name='unhide'
          styleName='TimerList-Unhide' 
          onClick={()=>unhideTimer(timer.id, date)}
        />
        <span>{timer.name}</span>
      </div>)}
  </div>
);
TimerList.propTypes = {
  timers: PropTypes.array.isRequired,
  unhideTimer: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired
};
export default TimerList;