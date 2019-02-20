import moment from 'moment';

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