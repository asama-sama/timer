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