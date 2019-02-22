import { connect } from 'react-redux';
import TimerApp from '../TimerApp';
import { isTimerVisibleForDate, isStateSame } from '../utils';
import { updateState } from '../actions';

// show only the timers that are visible for the given day
const mapStateToProps = state => {
  return {
    timers: state.timers.timersState.items
      .filter(t => isTimerVisibleForDate(t, state.date)),
    id: state.timers.timersState.id
  };
};

const mapDispatchToProps = dispatch => ({
  updateState: data => !isStateSame(data) ? 
    dispatch(updateState(data)) 
    : 
    undefined
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerApp);