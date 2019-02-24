export const addTimer = name => ({
  type: 'ADD_TIMER',
  name
});

export const updateActiveTimer = id => ({
  type: 'ACTIVE_TIMER',
  id
});

export const startTimer = id => ({
  type: 'START_TIMER',
  id
});

export const stopTimer = id => ({
  type: 'STOP_TIMER',
  id
});

export const hideTimer = (id, date) => ({
  type: 'HIDE_TIMER',
  id,
  date
});

export const unhideTimer = (id, date) => ({
  type: 'UNHIDE_TIMER',
  id,
  date
});

export const unhideRunningTimersForDate =  date => ({
  type: 'UNHIDE_RUNNING_TIMERS_FOR_DATE',
  date
});

export const deleteTimeBlock = timeBlockId => ({
  type: 'DELETE_TIME_BLOCK',
  timeBlockId
});

/**
 * [description]
 * @param  {[type]} id   id of time block
 * @param  {string} time moment().format()
 */
export const updateTimeBlockStart = (id, time) => ({
  type: 'UPDATE_TIME_BLOCK_START',
  id,
  time
});

export const updateTimeBlockEnd = (id, time) => ({
  type: 'UPDATE_TIME_BLOCK_END',
  id,
  time
});

export const updateState = data => ({
  type: 'UPDATE_STATE',
  data,
  receivedAt: new Date()
});

export const subtractDay = () => ({
  type: 'DAY_BACK'
});

export const addDay = () => ({
  type: 'DAY_FORWARD'
});