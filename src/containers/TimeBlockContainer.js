import { connect } from 'react-redux';
import moment from 'moment';
import {
  deleteTimeBlock, updateTimeBlockStart, updateTimeBlockEnd, timeWithinTimeBlocksCheck
} from '../actions';
import TimeBlock from '../Components/TimeBlockComponent/TimeBlock';

const mapStateToProps = state => ({
  calendarDate: state.date
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteTimeBlock: () => {
    dispatch(deleteTimeBlock(ownProps.id));
  },
  updateTimeBlockStart: (timeBlockId, newStartTime, endTime) => {
    const mNewStartTime = moment(newStartTime);
    const mEndTime = moment(endTime);

    if (!mNewStartTime.isBefore(mEndTime)) {
      return;
    }
    dispatch(timeWithinTimeBlocksCheck(timeBlockId, newStartTime))
      .then(withinTimeBlock => (
        !withinTimeBlock
          ? dispatch(updateTimeBlockStart(timeBlockId, mNewStartTime.format()))
          : undefined
      ));
  },
  updateTimeBlockEnd: (timeBlockId, startTime, newEndTime) => {
    const mStartTime = moment(startTime);
    const mNewEndTime = moment(newEndTime);

    if (mNewEndTime.isAfter(mStartTime)) {
      dispatch(updateTimeBlockEnd(timeBlockId, mNewEndTime.format()));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeBlock);
