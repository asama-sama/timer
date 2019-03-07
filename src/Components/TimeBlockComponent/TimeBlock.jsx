import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Button, Header, Modal
} from 'semantic-ui-react';
import TimeBlockInput from '../TimeBlockInputComponent/TimeBlockInput';
import TimeBlockInputRunning from '../TimeBlockInputComponent/TimeBlockInputRunning';
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
    const { deleteTimeBlock } = this.props;
    deleteTimeBlock();
    this.setState({ timeblockModalOpen: false });
  }

  deleteTimeBlockConfirm() {
    const { timeblockModalOpen } = this.state;
    return (
      <Modal
        basic
        trigger={(
          <Icon
            name='close'
            color='red'
            onClick={() => this.setState({ timeblockModalOpen: true })}
            styleName='TimeBlock-Delete'
          />
        )}
        open={timeblockModalOpen}
      >
        <Header
          icon='archive'
          content='Delete Time Block'
        />
        <Modal.Content>
          <p>Are you sure you want to delete this time block?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color='red'
            inverted
            onClick={() => this.setState({ timeblockModalOpen: false })}
          >
            <Icon name='remove' />
            No
          </Button>
          <Button
            color='green'
            inverted
            onClick={() => this.handleDeleteTimeblock()}
          >
            <Icon name='checkmark' />
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  render() {
    const {
      id, start, end, calendarDate,
      updateTimeBlockStart, updateTimeBlockEnd
    } = this.props;
    const { showDelete } = this.state;
    return (
      <div
        styleName='TimeBlock'
        onMouseEnter={() => this.setState({ showDelete: true })}
        onMouseLeave={() => this.setState({ showDelete: false })}
      >
        <TimeBlockInput
          id={id}
          input={start}
          updateTimeBlock={newStartTime => updateTimeBlockStart(id, newStartTime, end)}
          calendarDate={calendarDate}
        />
        -
        {end ? (
          <TimeBlockInput
            id={id}
            input={end}
            updateTimeBlock={newEndTime => updateTimeBlockEnd(id, start, newEndTime)}
            calendarDate={calendarDate}
          />
        )
          : <TimeBlockInputRunning />
        }
        {showDelete ? this.deleteTimeBlockConfirm() : undefined }
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
  calendarDate: PropTypes.string.isRequired
};
TimeBlock.defaultProps = {
  end: undefined
};
export default TimeBlock;
