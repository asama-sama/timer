import { connect } from 'react-redux';
import TimerApp from '../TimerApp';
import { isTimerVisibleForDate, isStateSame } from '../utils';
import { updateState, updateStateInit, unhideRunningTimersForDate } from '../actions';

// show only the timers that are visible for the given day
const mapStateToProps = state => ({
  timers: state.timers.timersState.items
    .filter(t => isTimerVisibleForDate(t, state.date)),
  id: state.timers.timersState.id,
  date: state.date
});

const mapDispatchToProps = dispatch => ({
  updateState: data => dispatch(updateStateInit(data)),
  unhideRunningTimersForDate:
    date => dispatch(unhideRunningTimersForDate(date))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerApp);
