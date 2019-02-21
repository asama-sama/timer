import { connect } from 'react-redux';
import { deleteTimeBlock, updateTimeBlockStart, updateTimeBlockEnd } from '../actions';
import TimeBlock from '../TimeBlockComponent/TimeBlock';
import { saveTimersState } from '../api';
import moment from 'moment';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTimeBlock: () => { 
    dispatch(deleteTimeBlock(ownProps.id));
    saveTimersState(dispatch);
  },
  updateTimeBlockStart: (timeBlockId, newStartTime, endTime) => {
    let mNewStartTime = moment(newStartTime);
    let mEndTime = moment(endTime);

    if(mNewStartTime.isBefore(mEndTime)) {
      dispatch(updateTimeBlockStart(timeBlockId, mNewStartTime.format()));
      saveTimersState(dispatch);
    }
  },
  updateTimeBlockEnd: (timeBlockId, startTime, newEndTime) => {
    let mStartTime = moment(startTime);
    let mNewEndTime = moment(newEndTime);

    if(mNewEndTime.isAfter(mStartTime)) {
      dispatch(updateTimeBlockEnd(timeBlockId, mNewEndTime.format()));
      saveTimersState(dispatch);
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps
)(TimeBlock);