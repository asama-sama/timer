import {connect} from 'react-redux';
import Timer from '../TimerComponent/Timer';
import {stopTimer, startTimer} from '../actions';

const mapStateToProps = (state, ownProps) => {
  let timer = state.timers.items.find(t => t.name === ownProps.name);
  return {
    ...timer, 
    activeTimer: state.timers.activeTimer
  };
};

const mapDispatchToProps = dispatch => ({
  stopTimer: name => dispatch(stopTimer(name)),
  startTimer: name => dispatch(startTimer(name))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Timer);