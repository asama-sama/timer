import { connect } from 'react-redux';
import { addTimer } from '../actions';
import TimerInput from '../TimerInputComponent/TimerInput';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addTimer: name => dispatch(addTimer(name))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerInput);