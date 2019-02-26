import React, {Component} from 'react';
import TimerContainer from './containers/TimerContainer';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import DatePickerContainer from './containers/DatePickerContainer';
import TimerFilterListContainer from './containers/TimerFilterListContainer';
import store from './reducers';
import './TimerApp.css';

class TimerApp extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.timerData){
      this.props.updateState(this.props.timerData);
      this.props.unhideRunningTimersForDate(this.props.date);
    }
  }

  componentDidUpdate() {
    if(this.props.timerData) {
      this.props.updateState(this.props.timerData);
      if(this.props.onSaveState){
        this.props.onSaveState(store.getState().timers.timersState);
      }
    }
  }

  render() {
    return (
      <div styleName='TimerApp'>
        <DatePickerContainer></DatePickerContainer>
        <Grid 
          columns={3}
          style={{margin: 0, marginBottom: '10px', width: '100%'}}>
          {this.props.timers.map(timer => {
            return (
              <TimerContainer key={timer.name}
                name={timer.name}
              />);
          })}
        </Grid>
        <TimerFilterListContainer />
      </div>
    );
  }
}
TimerApp.propTypes = {
  timers: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  timerData: PropTypes.object,
  updateState: PropTypes.func.isRequired,
  unhideRunningTimersForDate: PropTypes.func.isRequired,
  onSaveState: PropTypes.func
};
export default TimerApp;