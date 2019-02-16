import {connect} from 'react-redux';
import Timer from '../TimerComponent/Timer';
import {stopTimer} from '../actions';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  stopTimer: name => dispatch(stopTimer(name))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(Timer);