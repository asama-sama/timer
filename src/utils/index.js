import moment from 'moment';
import store from '../reducers';

/** Returns name of active timer */
export const getActiveTimer = timers => {
  return timers.map(t => {
    return {
      name: t.name,
      active: isTimerActive(t)
    };
  }).reduce((acc, next) => {
    if(next.active) {
      return next.name;
    } else {
      return acc;
    }
  }, '');
};

export const isTimerActive = timer => (
  timer.timeBlocks.map(tb => !tb.end)
    .reduce((acc, next) => acc || next, false)
);

export const isTimerActiveForDate = (timer, date) => (
  timer.timeBlocks.map(tb => (
    !tb.end && (
      moment().isSame(moment(date), 'day') ||
      moment(tb.start).isSame(moment(date), 'day')
    )
  )).reduce((acc, next) => acc||next, false)
);

// return true if timer is visible for a given day
export const isTimerVisibleForDate = (timer, date) => (
  timer.visibleDates
    .map(d =>(
      moment(d).isSame(moment(date), 'day')))
    .reduce((acc, next) => acc || next, false)
);

/**
 * Takes a time and timeblock id, and returns true if this
 * time is within any siblings of this timeblock
 * @param  {string} time        moment().format()
 * @param  {string} timeBlockId uuid of timeblock
 */
export const timeWithinTimeBlocks = (time, timeBlockId) => {
  let mTime = moment(time);
  let timer = store.getState().timers.timersState
    .items.map(t => {
      let timeBlock = 
        t.timeBlocks.find(tb => tb.id===timeBlockId);
      return timeBlock ? t : undefined;
    })
    .reduce((acc, next) => acc || next, undefined);

  !timer ? console.error(`could not find timeblock ${timeBlockId}`) : undefined;

  return timer.timeBlocks.map(tb => {
    if(tb.id !== timeBlockId) {
      let mStart = moment(tb.start);
      let mEnd = moment(tb.end);
      return mTime.isAfter(mStart) && mTime.isBefore(mEnd);
    }
    return false;
  })
    .reduce((acc, next) => acc || next, false);
};

export const getTimeFormat = showSeconds => {
  let format;
  if(showSeconds) {
    format = 'HH:mm:ss';
  } else {
    format = 'HH:mm';
  }
  return format;
};

export const getTimerByName = name => (
  store.getState().timers.timersState.items
    .find(timer => timer.name === name)
);

export const isStateSame = newState => {
  return store.getState().timers.timersState &&
    store.getState().timers.timersState._id === newState._id
};



