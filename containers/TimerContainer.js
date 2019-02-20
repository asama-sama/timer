import {connect} from 'react-redux';
import Timer from '../TimerComponent/Timer';
import {stopTimer, startTimer} from '../actions';
import {saveTimersState} from '../api';
import moment from 'moment';

const mapStateToProps = (state, ownProps) => {
  let timer = state.timers.timersState.items.find(t => t.name === ownProps.name);
  timer = {
    ...timer,
    timeBlocks: timer.timeBlocks.filter(tb => {
      return moment(tb.start).isSame(moment(state.date), 'day') ||
      moment(tb.start).isSame(moment(state.date), 'day');
    })
  };
  return {
    ...timer, 
    activeTimer: state.timers.timersState.activeTimer
  };
};

const mapDispatchToProps = dispatch => ({
  stopTimer: name => {
    dispatch(stopTimer(name));
    saveTimersState(dispatch);
  },
  startTimer: name => {
    dispatch(startTimer(name));
    saveTimersState(dispatch);
  }
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Timer);