import React, {Component} from 'react';
import TimerContainer from './containers/TimerContainer';
import PropTypes from 'prop-types';
import DatePickerContainer from './containers/DatePickerContainer';
import TimerFilterListContainer from './containers/TimerFilterListContainer';
import store from './reducers';
import './TimerApp.css';

class TimerApp extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateState(this.props.timerData);
    this.props.unhideRunningTimersForDate(this.props.date);
  }

  componentDidUpdate() {
    this.props.updateState(this.props.timerData);
    if(this.props.onSaveState){
      this.props.onSaveState(store.getState().timers.timersState);
    }
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
  date: PropTypes.string.isRequired,
  timerData: PropTypes.object.isRequired,
  updateState: PropTypes.func.isRequired,
  unhideRunningTimersForDate: PropTypes.func.isRequired,
  onSaveState: PropTypes.func
};
export default TimerApp;