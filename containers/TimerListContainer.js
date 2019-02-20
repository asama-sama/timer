import {connect} from 'react-redux';
import TimerList from '../TimerListComponent/TimerList';
import {unhideTimer} from '../actions';

const mapStateToProps = state => ({
  timers: state.timers.timersState.items
    .filter(t => t.hide)
});

const mapDispatchToProps = dispatch => ({
  unhideTimer: name => dispatch(unhideTimer(name))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TimerList);