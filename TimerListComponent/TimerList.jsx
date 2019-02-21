import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './TimerList.css';

class TimerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.timers.map(timer => 
          <div key={timer.name}>
            <Icon 
              name='unhide'
              styleName='TimerList-Unhide' 
              onClick={()=>this.props.unhideTimer(timer.id, this.props.date)}
            />
            <span>{timer.name}</span>
          </div>)}
      </div>
    );
  }
}
TimerList.propTypes = {
  timers: PropTypes.array.isRequired,
  unhideTimer: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired
};
export default TimerList;