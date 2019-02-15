import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TimerInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Timer">
        <input
          type="text" name="newTimer" 
          value={this.props.newTimer} 
          onChange={this.props.updateNewTimer}
          onKeyPress={this.props.onEnterNewTimer}/>
      </div>
    );
  }
}
TimerInput.propTypes = {
  newTimer: PropTypes.string.isRequired,
  updateNewTimer: PropTypes.func.isRequired,
  onEnterNewTimer: PropTypes.func.isRequired
};
export default TimerInput;