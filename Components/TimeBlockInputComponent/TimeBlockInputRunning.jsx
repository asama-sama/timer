import React, { Component } from 'react';
import moment from 'moment';
import { getTimeFormat } from '../utils';
import './TimeBlockInput.css';

class TimeBlockInputRunning extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshClock: true};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({refreshClock: !this.state.refreshClock});
  }

  render() {
    return (
      <span styleName='TimeBlockInput TimeBlockInput-Display'>
        {moment().format(getTimeFormat(true))}
      </span>);
  }
}
export default TimeBlockInputRunning;