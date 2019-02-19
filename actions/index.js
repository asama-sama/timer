export const addTimer = name => ({
  type: 'ADD_TIMER',
  name
});

export const updateActiveTimer = name => ({
  type: 'ACTIVE_TIMER',
  name
});

export const startTimer = name => ({
  type: 'START_TIMER',
  name
});

export const stopTimer = name => ({
  type: 'STOP_TIMER',
  name
});

export const requestState = () => ({
  type: 'REQUEST_STATE'
});

export const requestStateSuccess = json => ({
  type: 'RECEIVE_STATE',
  data: json,
  receivedAt: Date.now()
});

export const requestStateFail = () => ({
  type: 'RECEIVE_STATE_FAIL',
  receivedAt: Date.now()
});

export const fetchState = () => {
  return dispatch => {
    dispatch(requestStateSuccess());

    return fetch('/api/timer/getState')
      .then(
        res => res.json(),
        error => console.error('An error occurred', error))
      .then(json => {
        // object is empty
        if(!Object.keys(json).length) {
          dispatch(requestStateSuccess(undefined));
        } else {
          dispatch(requestStateSuccess(json));
        }
      })
      .catch(() => dispatch(requestStateFail()));
  };
};

export const saveTimersStateRequest = () => ({
  type: 'SAVE_TIMERS_STATE_REQUEST'
});

export const saveTimersStateSuccess = () => ({
  type: 'SAVE_TIMERS_STATE_SUCCESS'
});

export const saveTimersStateFail = () => ({
  type: 'SAVE_TIMERS_STATE_FAIL'
});

/** Do not call this directly. Call from /api */
export const saveTimersState = (data) => {
  return dispatch => {
    dispatch(saveTimersStateRequest());

    return fetch('/api/timer/saveTimersState', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then( res => {
        if(res.ok) {
          dispatch(saveTimersStateSuccess());
        } else {
          dispatch(saveTimersStateFail());
        }
      });
  };
};