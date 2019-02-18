import React, {Component} from 'react';
import TimerInputContainer from './containers/TimerInputContainer';
import TimerContainer from './Containers/TimerContainer';
import PropTypes from 'prop-types';

class TimerApp extends Component {
  
  constructor(props) {
    super(props);
  }

  updateNewTimer(e) {
    this.setState({newTimer: e.target.value});
  }

  componentDidMount() {
    this.props.fetchState();
  }

  render() {
    return (
      <div>
        <div className="Categories">
          {this.props.timers.items.map(timer => {
            return (
              <TimerContainer key={timer.name}
                name={timer.name}
              />);
          })}
        </div>
        <TimerInputContainer/>
      </div>
    );
  }
}
TimerApp.propTypes = {
  timers: PropTypes.any.isRequired,
  fetchState: PropTypes.func.isRequired
};
export default TimerApp;