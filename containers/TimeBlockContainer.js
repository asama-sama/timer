import { connect } from 'react-redux';
import { deleteTimeBlock, updateTimeBlockStart, updateTimeBlockEnd } from '../actions';
import TimeBlock from '../TimeBlockComponent/TimeBlock';
import { timeWithinTimeBlocks } from '../utils';
import moment from 'moment';

const mapStateToProps = state => ({
  calendarDate: state.date
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTimeBlock: () => { 
    dispatch(deleteTimeBlock(ownProps.id));
  },
  updateTimeBlockStart: (timeBlockId, newStartTime, endTime) => {
    let mNewStartTime = moment(newStartTime);
    let mEndTime = moment(endTime);

    if(mNewStartTime.isBefore(mEndTime)
      && !timeWithinTimeBlocks(newStartTime, timeBlockId)) {
      dispatch(updateTimeBlockStart(timeBlockId, mNewStartTime.format()));

    }
  },
  updateTimeBlockEnd: (timeBlockId, startTime, newEndTime) => {
    let mStartTime = moment(startTime);
    let mNewEndTime = moment(newEndTime);

    if(mNewEndTime.isAfter(mStartTime)) {
      dispatch(updateTimeBlockEnd(timeBlockId, mNewEndTime.format()));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps
)(TimeBlock);