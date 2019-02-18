import { connect } from 'react-redux';
import TimerApp from '../TimerApp';
import { fetchState } from '../actions';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  fetchState: () => dispatch(fetchState())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerApp);