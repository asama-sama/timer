import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimeField from 'react-simple-timefield';

class TimeBlockInput extends Component {
  constructor(props) {
    super(props);
    this.formatTime = this.formatTime.bind(this);
    this.onEnter = this.onEnter.bind(this);

    this.state = {
      time: this.props.input ? this.formatTime(this.props.input) : undefined,
      refreshClock: true,
      shouldUpdate: false
    };
  }

  componentDidUpdate(){
    if(this.state.shouldUpdate) {
      this.setState({
        time: this.formatTime(this.props.input),
        shouldUpdate: false
      });
    }
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

  formatTime(time) {
    return moment(time).format('hh:mm:ss');
  }

  onEnter(e) {
    if(e.key==='Enter') {
      this.setState({shouldUpdate: true});
      this.props.updateTimeBlock(this.state.time);
    }
  }

  render() {

    return (<TimeField
      value={this.state.time || moment().format('HH:mm:ss')}
      onChange={e => this.setState({time: e})}
      onKeyPress={this.onEnter}
      style={{
        border: 'none',
        borderBottom: '1px solid rgb(224, 224, 224)',
        width: '50px',
        textAlign: 'center',
        margin: '5px',
        marginTop: 0
      }}
      showSeconds
    />);
  }
}
TimeBlockInput.propTypes = {
  input: PropTypes.any,
  id: PropTypes.string.isRequired,
  updateTimeBlock: PropTypes.func.isRequired
};
export default TimeBlockInput;