import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'semantic-ui-react';

class TimerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.timers.map(timer => 
          <div key={timer.name}>
            <Checkbox 
              label={timer.name}
              onClick={() => this.props.unhideTimer(timer.name)}
            />
          </div>)}
      </div>
    );
  }
}
TimerList.propTypes = {
  timers: PropTypes.array.isRequired,
  unhideTimer: PropTypes.func.isRequired
};
export default TimerList;