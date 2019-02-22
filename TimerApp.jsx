import React, {Component} from 'react';
import TimerContainer from './containers/TimerContainer';
import PropTypes from 'prop-types';
import DatePickerContainer from './containers/DatePickerContainer';
import TimerFilterListContainer from './containers/TimerFilterListContainer';
import './TimerApp.css';

class TimerApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {timerInput: ''};
  }

  componentDidUpdate() {
    this.props.updateState(this.props.timerData);
  }

  render() {
    return (
      <div styleName='TimerApp'>
        <DatePickerContainer></DatePickerContainer>
        {this.props.timers.map(timer => {
          return (
            <TimerContainer key={timer.name}
              name={timer.name}
            />);
        })}
        <TimerFilterListContainer />
      </div>
    );
  }
}
TimerApp.propTypes = {
  timers: PropTypes.array.isRequired,
  timerData: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired
};
export default TimerApp;