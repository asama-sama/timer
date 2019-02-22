import React, {Component} from 'react';
import { Provider } from 'react-redux';
import TimerAppContainer from './containers/TimerAppContainer';
import store from './reducers';
import PropTypes from 'prop-types';

class TimerAppWrapper extends Component {

  render() {
    return (
      <Provider store={store}>
        <TimerAppContainer timerData={this.props.timerData}/>
      </Provider>
    );
  }
}
TimerAppWrapper.propTypes = {
  timerData: PropTypes.object.isRequired
};
export default TimerAppWrapper;