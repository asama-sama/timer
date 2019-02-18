import React, {Component} from 'react';
import { Provider } from 'react-redux';
import TimerAppContainer from './containers/TimerAppContainer';
import store from './reducers';

class TimerAppWrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <TimerAppContainer />
      </Provider>
    );
  }
}
export default TimerAppWrapper;