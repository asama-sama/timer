import { connect } from 'react-redux';
import { addTimer, unhideTimer, getTimerByName } from '../actions';
import TimerInput from '../Components/TimerInputComponent/TimerInput';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    addTimer: name => {
      dispatch(getTimerByName(name))
        .then(
          timer => {
            if (timer) {
              dispatch(unhideTimer(name, ownProps.date));
            } else {
              dispatch(addTimer(name, ownProps.date));
            }
          }
        );
    }
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInput);
