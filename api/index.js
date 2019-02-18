import store from '../reducers';
import {saveTimersState as saveTimersAction} from '../actions';

export const saveTimersState = dispatch => (
  dispatch(saveTimersAction(store.getState().timers.timersState))
);