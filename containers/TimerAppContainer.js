import { connect } from 'react-redux';
import TimerApp from '../TimerApp';
import { startTimer } from '../actions';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    startTimer: (name) => dispatch(startTimer(name))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerApp);