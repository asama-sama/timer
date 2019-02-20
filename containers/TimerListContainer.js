import {connect} from 'react-redux';
import TimerList from '../TimerListComponent/TimerList';
import {unhideTimer} from '../actions';
import { isTimerVisibleForDate } from '../utils';

const mapStateToProps = state => ({
  timers: state.timers.timersState.items
    .filter(t => !isTimerVisibleForDate(t, state.date)),
  date: state.date
});

const mapDispatchToProps = dispatch => ({
  unhideTimer: (name, date) => dispatch(unhideTimer(name, date))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TimerList);