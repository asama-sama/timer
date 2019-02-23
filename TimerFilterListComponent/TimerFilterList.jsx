import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Divider} from 'semantic-ui-react';
import TimerListContainer from '../containers/TimerListContainer';
import TimerInputContainer from '../containers/TimerInputContainer';

class TimerFilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {timerInput: ''};
    this.updateTimerInput = this.updateTimerInput.bind(this);
  }

  updateTimerInput(timerInput) {
    this.setState({timerInput});
  }

  render() {
    return (
      <Segment style={{maxWidth: '260px'}}>
        <TimerInputContainer
          timerInput={this.state.timerInput} 
          updateTimerInput={this.updateTimerInput}
          date={this.props.date}
        />
        <Divider />
        <TimerListContainer 
          filter={this.state.timerInput}
          date={this.props.date}
        />
      </Segment>
    );
  }
}
TimerFilterList.propTypes = {
  date: PropTypes.string.isRequired
};
export default TimerFilterList;