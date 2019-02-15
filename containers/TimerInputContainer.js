import { connect } from 'react-redux';
import { addTimer } from '../actions';
import TimerInput from '../TimerInputComponent/TimerInput';

const mapStateToProps = state => ({
  timers: state.timers
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTimer: () => dispatch(addTimer(ownProps.newTimer))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInput);