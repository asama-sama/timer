import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import TimerAppContainer from './containers/TimerAppContainer';
import store from './reducers';

const TimerAppWrapper = props => {
  const { timerData, onSaveState } = props;
  return (
    <Provider store={store}>
      <TimerAppContainer
        timerData={timerData}
        onSaveState={onSaveState}
      />
    </Provider>
  );
};
TimerAppWrapper.propTypes = {
  timerData: PropTypes.shape({
    items: PropTypes.array,
  }),
  onSaveState: PropTypes.func
};
TimerAppWrapper.defaultProps = {
  timerData: {},
  onSaveState: () => {}
};
export default TimerAppWrapper;
