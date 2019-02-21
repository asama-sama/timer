import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Header, Modal } from 'semantic-ui-react';
import TimeBlockInput from '../TimeBlockInputComponent/TimeBlockInput';
import './TimeBlock.css';

class TimeBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      timeblockModalOpen: false
    };
    this.deleteTimeBlockConfirm = this.deleteTimeBlockConfirm.bind(this);
    this.handleDeleteTimeblock = this.handleDeleteTimeblock.bind(this);
  }

  handleDeleteTimeblock() {
    this.props.deleteTimeBlock();
    this.setState({timeblockModalOpen: false});
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
            styleName='TimeBlock-Delete'
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
            onClick={()=> this.handleDeleteTimeblock()}
          >
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    return(
      <div styleName='TimeBlock'
        onMouseEnter={() => this.setState({showDelete: true})}
        onMouseLeave={() => this.setState({showDelete: false})}
      >
        <TimeBlockInput
          id={this.props.id} 
          input={this.props.start}
          updateTimeBlock={newStartTime => 
            this.props.updateTimeBlockStart(
              this.props.id,
              newStartTime, 
              this.props.end)}
          calendarDate={this.props.calendarDate}
        />
        -
        <TimeBlockInput 
          id={this.props.id} 
          input={this.props.end} 
          updateTimeBlock={newEndTime => 
            this.props.updateTimeBlockEnd(
              this.props.id,
              this.props.start,
              newEndTime
            )}
          calendarDate={this.props.calendarDate}
        />
        {this.state.showDelete ?
          this.deleteTimeBlockConfirm() : undefined }
      </div>
    );
  }
}
TimeBlock.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  deleteTimeBlock: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  updateTimeBlockStart: PropTypes.func.isRequired,
  updateTimeBlockEnd: PropTypes.func.isRequired,
  calendarDate: PropTypes.any.isRequired
};
export default TimeBlock;