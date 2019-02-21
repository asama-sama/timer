import { connect } from 'react-redux';
import { addTimer, unhideTimer } from '../actions';
import { saveTimersState } from '../api';
import { getTimerByName } from '../utils';
import TimerInput from '../TimerInputComponent/TimerInput';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTimer: name => {
      let timer = getTimerByName(name);
      if(timer) {
        dispatch(unhideTimer(timer.id, ownProps.date));
      } else {
        dispatch(addTimer(name, ownProps.date));
      }
      saveTimersState(dispatch);
    }
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInput);