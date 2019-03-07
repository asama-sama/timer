import moment from 'moment';

export const isTimerActive = timer => (
  timer.timeBlocks.map(tb => !tb.end)
    .reduce((acc, next) => acc || next, false)
);

/** Returns name of active timer */
export const getActiveTimer = timers => (
  timers.map(t => (
    {
      ...t,
      active: isTimerActive(t)
    }
  )).reduce((acc, next) => {
    if (next.active) {
      return next;
    }
    return acc;
  }, {})
);

export const isTimerActiveForDate = (timer, date) => (
  timer.timeBlocks.map(tb => (
    !tb.end && (
      moment().isSame(moment(date), 'day')
      || moment(tb.start).isSame(moment(date), 'day')
    )
  )).reduce((acc, next) => acc || next, false)
);

// return true if timer is visible for a given day
export const isTimerVisibleForDate = (timer, date) => (
  timer.visibleDates
    .map(d => (
      moment(d).isSame(moment(date), 'day')))
    .reduce((acc, next) => acc || next, false)
);

/**
 * Takes a time and timeblock id, and returns true if this
 * time is within any siblings of this timeblock
 * @param  {string} time        moment().format()
 * @param  {string} timeBlockId uuid of timeblock
 */
export const timeWithinTimeBlocks = (timeBlockId, time, timers) => {
  const mTime = moment(time);
  const timer = timers.map(t => (
    t.timeBlocks.find(tb => tb.id === timeBlockId)
      ? t : undefined
  ))
    .reduce((acc, next) => acc || next, undefined);

  if (!timer) {
    throw new Error(`could not find timeblock ${timeBlockId}`);
  }

  return timer.timeBlocks.map(tb => {
    if (tb.id !== timeBlockId) {
      const mStart = moment(tb.start);
      const mEnd = moment(tb.end);
      return mTime.isAfter(mStart) && mTime.isBefore(mEnd);
    }
    return false;
  })
    .reduce((acc, next) => acc || next, false);
};

export const getTimeFormat = showSeconds => {
  let format;
  if (showSeconds) {
    format = 'HH:mm:ss';
  } else {
    format = 'HH:mm';
  }
  return format;
};

export const getTimerByName = (name, timers) => (
  timers.find(timer => timer.name === name)
);

export const isObjectEmpty = obj => (
  Object.keys(obj).length === 0
);
