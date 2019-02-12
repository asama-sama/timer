import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './Category.css';

class Category extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName='Category'>
        <div>
          <span styleName='Category-Text'>{this.props.name}</span>
          <Button color='green' onClick={this.props.startTimer}>start</Button>
          <Button color='red' onClick={this.props.stopTimer}>stop</Button>
        </div>
        <div>{this.props.timers.map( (timer, idx) => {
          return <div key={idx}>{timer.start}</div>;
        })}</div>
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