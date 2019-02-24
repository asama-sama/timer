import {connect} from 'react-redux';
import TimerList from '../Components/TimerListComponent/TimerList';
import {unhideTimer} from '../actions';
import { isTimerVisibleForDate } from '../utils';

const mapStateToProps = (state, ownProps) => ({
  date: state.date,
  timers: state.timers.timersState.items
    .filter(timer => timer.name.includes(ownProps.filter))
    .filter(t => !isTimerVisibleForDate(t, state.date))
});

const mapDispatchToProps = dispatch => ({
  unhideTimer: (name, date) => dispatch(unhideTimer(name, date))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TimerList);