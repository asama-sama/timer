import store from '../reducers';
import {saveTimersState as saveTimersAction} from '../actions';

/**
 * Helper method to save correct part of store
 */
export const saveTimersState = dispatch => (
  dispatch(saveTimersAction(store.getState().timers.timersState))
);