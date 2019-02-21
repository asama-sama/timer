import { connect } from 'react-redux';
import TimerFilterList from '../TimerFilterListComponent/TimerFilterList';


const mapStateToProps = state => ({
  date: state.date,
  timers: state.timers.timersState.items
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps, mapDispatchToProps
)(TimerFilterList);