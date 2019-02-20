import { connect } from 'react-redux';
import TimerApp from '../TimerApp';
import { fetchState } from '../actions';
import { isTimerVisibleForDate } from '../utils';

// show only the timers that are visible for the given day
const mapStateToProps = state => {
  return {
    timers: state.timers.timersState.items
      .filter(t => isTimerVisibleForDate(t, state.date))
  };
};

const mapDispatchToProps = dispatch => ({
  fetchState: () => dispatch(fetchState())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerApp);