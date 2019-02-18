import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import TimerAppContainer from './containers/TimerAppContainer';
import reducer from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware)
);

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