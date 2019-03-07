import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import TimerContainer from './containers/TimerContainer';
import DatePickerContainer from './containers/DatePickerContainer';
import TimerFilterListContainer from './containers/TimerFilterListContainer';
import store from './reducers';
import { isObjectEmpty } from './utils';
import './TimerApp.css';

class TimerApp extends Component {
  componentDidMount() {
    const {
      timerData, updateState,
      unhideRunningTimersForDate, date
    } = this.props;
    if (!isObjectEmpty(timerData)) {
      updateState(timerData);
      unhideRunningTimersForDate(date);
    }
  }

  componentDidUpdate() {
    const { timerData, updateState, onSaveState } = this.props;
    if (!isObjectEmpty(timerData)) {
      updateState(timerData);
      if (onSaveState) {
        onSaveState(store.getState().timers.timersState);
      }
    }
  }

  render() {
    const { timers } = this.props;
    return (
      <div styleName='TimerApp'>
        <DatePickerContainer />
        {timers ? (
          <React.Fragment>
            <Grid
              columns={3}
              style={{ margin: 0, marginBottom: '10px', width: '100%' }}
            >
              {timers.map(timer => (
                <TimerContainer
                  key={timer.name}
                  name={timer.name}
                />
              ))}
            </Grid>
            <TimerFilterListContainer />
          </React.Fragment>
        )
          : null }
      </div>
    );
  }
}
TimerApp.propTypes = {
  timers: PropTypes.arrayOf(PropTypes.object),
  date: PropTypes.string.isRequired,
  timerData: PropTypes.shape({
    items: PropTypes.array
  }),
  updateState: PropTypes.func.isRequired,
  unhideRunningTimersForDate: PropTypes.func.isRequired,
  onSaveState: PropTypes.func
};
TimerApp.defaultProps = {
  timerData: {},
  timers: [],
  onSaveState: () => {}
};

export default TimerApp;
