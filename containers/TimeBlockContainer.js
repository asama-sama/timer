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
  updateTimeBlockStart: (id, newTime, startTime, endTime) => {
    // time comes in format HH:mm:ss
    let mNewTime = moment(newTime, 'HH:mm:ss');

    let mStartTime = moment(startTime)
      .set('hour', mNewTime.hour())
      .set('minute', mNewTime.minute())
      .set('second', mNewTime.second());
    let mEndTime = moment(endTime);
    if(mStartTime.isBefore(mEndTime)) {
      dispatch(updateTimeBlockStart(id, mStartTime.format()));
      saveTimersState(dispatch);
    }
  },
  updateTimeBlockEnd: (id, time) => {
    dispatch(updateTimeBlockEnd(id, time));
    saveTimersState(dispatch);
  }
});

export default connect(mapStateToProps, mapDispatchToProps
)(TimeBlock);