import {connect} from 'react-redux';
import Timer from '../TimerComponent/Timer';
import {stopTimer, startTimer} from '../actions';
import {saveTimersState} from '../api';


const mapStateToProps = (state, ownProps) => {
  let timer = state.timers.timersState.items.find(t => t.name === ownProps.name);
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