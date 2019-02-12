import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TimerDisplay from '../TimerDisplayComponent/TimerDisplay';
import './Category.css';

class Category extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let timers;
    if(this.props.timers !== undefined) {
      timers = <div>{this.props.timers.map( (timer, idx) => {
        return (
          <div key={idx}>
            <TimerDisplay {...timer}></TimerDisplay>
          </div>);
      })}</div>;
    } else {
      timers = <div />;
    }

    return (
      <div styleName='Category'>
        <div>
          <span styleName='Category-Text'>{this.props.name}</span>
          <Button color='green' onClick={this.props.startTimer}>start</Button>
          <Button color='red' onClick={this.props.stopTimer}>stop</Button>
        </div>
        {timers}
      </div>
    );
  }
}
Category.propTypes = {
  name: PropTypes.string.isRequired,
  timers: PropTypes.array,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired
};
export default Category;