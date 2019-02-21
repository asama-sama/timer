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

  componentDidMount() {
    this.props.fetchState();
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
  fetchState: PropTypes.func.isRequired
};
export default TimerApp;