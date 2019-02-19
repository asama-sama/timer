import { connect } from 'react-redux';
import { deleteTimeBlock } from '../actions';
import TimerDisplay from '../TimerDisplayComponent/TimerDisplay';
import { saveTimersState } from '../api';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTimeBlock: () =>{ 
    dispatch(deleteTimeBlock(ownProps.name, ownProps.index));
    saveTimersState(dispatch);
  }});

export default connect(mapStateToProps, mapDispatchToProps
)(TimerDisplay);