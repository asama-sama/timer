import React, {Component} from 'react';
import TimerInputContainer from './containers/TimerInputContainer';
import TimerContainer from './containers/TimerContainer';
import PropTypes from 'prop-types';
import DatePickerContainer from './containers/DatePickerContainer';
import './TimerApp.css';

class TimerApp extends Component {
  
  constructor(props) {
    super(props);
  }

  updateNewTimer(e) {
    this.setState({newTimer: e.target.value});
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
        <TimerInputContainer/>
      </div>
    );
  }
}
TimerApp.propTypes = {
  timers: PropTypes.array.isRequired,
  fetchState: PropTypes.func.isRequired
};
export default TimerApp;