import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TimerAppContainer from './containers/TimerAppContainer';
import reducer from './reducers';

const store = createStore(reducer);

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