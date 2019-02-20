import {connect} from 'react-redux';
import Timer from '../TimerComponent/Timer';
import {stopTimer, startTimer} from '../actions';
import {saveTimersState} from '../api';
import moment from 'moment';

/** Returns name of active timer */
const getActiveTimer = timers => {
  return timers.map(t => {
    let active = t.timeBlocks.map(tb => {
      return !tb.end;
    }).reduce((acc, next) => {
      return acc || next;
    }, false);
    return {
      name: t.name,
      active
    };
  }).reduce((acc, next) => {
    if(next.active) {
      return next.name;
    } else {
      return acc;
    }
  }, '');
};

const mapStateToProps = (state, ownProps) => {
  let timer = state.timers.timersState.items.find(t => t.name === ownProps.name);
  timer = {
    ...timer,
    timeBlocks: timer.timeBlocks.filter(tb => {
      return moment(tb.start).isSame(moment(state.date), 'day') ||
      moment(tb.start).isSame(moment(state.date), 'day');
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