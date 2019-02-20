import { connect } from 'react-redux';
import { addTimer, unhideTimers } from '../actions';
import { saveTimersState } from '../api';
import TimerInput from '../TimerInputComponent/TimerInput';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addTimer: name => {
      dispatch(addTimer(name));
      saveTimersState(dispatch);
    },
    unhideTimers: () => dispatch(unhideTimers())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInput);