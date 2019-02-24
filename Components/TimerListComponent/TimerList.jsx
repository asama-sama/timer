import React from 'react';
import PropTypes from 'prop-types';
import TimerListElement from '../TimerListElementComponent/TimerListElement';

const TimerList = ({timers, unhideTimer, date}) => (
  <div>
    {timers.map(timer => 
      <TimerListElement
        key={timer.id}
        {...timer}
        date={date}
        unhideTimer={unhideTimer}
      />)
    }
  </div>
);
TimerList.propTypes = {
  timers: PropTypes.array.isRequired,
  unhideTimer: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired
};
export default TimerList;