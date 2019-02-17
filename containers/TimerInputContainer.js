import { connect } from 'react-redux';
import { addTimer, updateNewTimerInput } from '../actions';
import TimerInput from '../TimerInputComponent/TimerInput';

const mapStateToProps = state => ({
  newTimerInput: state.newTimerInput
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTimer: () => dispatch(addTimer(ownProps.newTimer)),
    updateNewTimerInput: text => dispatch(updateNewTimerInput(text))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInput);