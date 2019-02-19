import { connect } from 'react-redux';
import { addTimer } from '../actions';
import { saveTimersState } from '../api';
import TimerInput from '../TimerInputComponent/TimerInput';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addTimer: name => {
      dispatch(addTimer(name));
      saveTimersState(dispatch);
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInput);