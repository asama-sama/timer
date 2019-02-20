import { connect } from 'react-redux';
import TimerApp from '../TimerApp';
import { fetchState } from '../actions';

const mapStateToProps = state => {
  return {
    timers: state.timers.timersState.items.filter(timer => !timer.hide)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchState: () => dispatch(fetchState())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerApp);