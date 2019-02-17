import { connect } from 'react-redux';
import TimerApp from '../TimerApp';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = () => {
  return {};
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerApp);