import {connect} from 'react-redux';
import Timer from '../TimerComponent/Timer';
import {stopTimer, startTimer, hideTimer} from '../actions';
import {saveTimersState} from '../api';
import moment from 'moment';
import {getActiveTimer} from '../utils';


const mapStateToProps = (state, ownProps) => {
  let timer = state.timers.timersState.items.find(t => t.name === ownProps.name);
  timer = {
    ...timer,
    timeBlocks: timer.timeBlocks.filter(tb => {
      return moment(tb.start).isSame(moment(state.date), 'day') ||
      moment(tb.end).isSame(moment(state.date), 'day');
    })
  };
  let activeTimer = getActiveTimer(state.timers.timersState.items);
  return {
    ...timer, 
    activeTimer,
    date: state.date
  };
};

const mapDispatchToProps = dispatch => ({
  stopTimer: id => {
    dispatch(stopTimer(id));
    saveTimersState(dispatch);
  },
  startTimer: id => {
    dispatch(startTimer(id));
    saveTimersState(dispatch);
  },
  hideTimer: (id, date) => {
    dispatch(hideTimer(id, date));
    saveTimersState(dispatch);
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Timer);