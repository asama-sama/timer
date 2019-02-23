import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './TimerListElement.css';

class TimerListElement extends Component {
  constructor(props) {
    super(props);

    this.state = {highlight: false};
    this.highlightTimer = this.highlightTimer.bind(this);
    this.unHighlightTimer = this.unHighlightTimer.bind(this);
  }

  highlightTimer() {
    this.setState({highlight: true});
  }

  unHighlightTimer() {
    this.setState({highlight: false});
  }

  render() {
    return (
      <div
        onMouseEnter={this.highlightTimer}
        onMouseLeave={this.unHighlightTimer}
        styleName={
          this.state.highlight ? 
            'TimerListElement TimerListElement--highlight' 
            : 'TimerListElement'
        }
        onClick={()=>
          this.props.unhideTimer(this.props.id, this.props.date)}
      >
        <Icon 
          name='unhide'
        />
        <span>{this.props.name}</span>
      </div> );
  }
}
TimerListElement.propTypes = {
  unhideTimer: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default TimerListElement;