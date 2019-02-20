import React, {Component} from 'react';
import TimerInputContainer from './containers/TimerInputContainer';
import TimerContainer from './containers/TimerContainer';
import PropTypes from 'prop-types';
import DatePickerContainer from './containers/DatePickerContainer';

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
      <div>
        <div className="Categories">
          <DatePickerContainer></DatePickerContainer>
          {this.props.timers.timersState.items.map(timer => {
            return (
              <TimerContainer key={timer.name}
                name={timer.name}
              />);
          })}
        </div>
        <TimerInputContainer/>
      </div>
    );
  }
}
TimerApp.propTypes = {
  timers: PropTypes.any.isRequired,
  fetchState: PropTypes.func.isRequired
};
export default TimerApp;