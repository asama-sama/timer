import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Icon, Button, Header, Modal } from 'semantic-ui-react';
import './TimerDisplay.css';

class TimerDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {refreshClock: true};
    this.formatTime = this.formatTime.bind(this);
    this.state = {
      showDelete: false,
      timeblockModalOpen: false
    };
    this.deleteTimeBlockConfirm = this.deleteTimeBlockConfirm.bind(this);
  }

  formatTime(time) {
    return moment(time).format('hh:mm:ss');
  }

  deleteTimeBlockConfirm() {
    return (
      <Modal 
        basic 
        trigger={
          <Icon 
            name='close'
            color='red'
            onClick={() => this.setState({timeblockModalOpen: true})}
          />}
        open={this.state.timeblockModalOpen}
      >
        <Header icon='archive' 
          content='Delete Time Block' />
        <Modal.Content>
          <p>Are you sure you want to delete this time block?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted
            onClick={()=> this.setState({timeblockModalOpen: false})}
          >
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted
            onClick={()=> this.setState({timeblockModalOpen: false})}
          >
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    return(
      <div styleName='TimerDisplay'
        onMouseEnter={() => this.setState({showDelete: true})}
        onMouseLeave={() => this.setState({showDelete: false})}
      >
        <span>{this.formatTime(this.props.start)} </span>-
        <span> {this.formatTime(this.props.end)}</span>
        {this.state.showDelete ?
          this.deleteTimeBlockConfirm() : undefined }
      </div>
    );
  }
}
TimerDisplay.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  active: PropTypes.bool.isRequired
};
export default TimerDisplay;