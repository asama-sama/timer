import { connect } from 'react-redux';
import { deleteTimeBlock } from '../actions';
import TimeBlock from '../TimeBlockComponent/TimeBlock';
import { saveTimersState } from '../api';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTimeBlock: () =>{ 
    dispatch(deleteTimeBlock(ownProps.name, ownProps.id));
    saveTimersState(dispatch);
  }});

export default connect(mapStateToProps, mapDispatchToProps
)(TimeBlock);