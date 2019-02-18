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

export const receiveState = json => ({
  type: 'RECEIVE_STATE',
  data: json,
  receivedAt: Date.now()
});

export const fetchState = () => {
  return dispatch => {
    dispatch(requestState());

    return fetch('/api/timer/getState')
      .then(
        res => res.json(),
        error => console.error('An error occurred', error))
      .then(json => dispatch(receiveState(json))
      );
  };
};