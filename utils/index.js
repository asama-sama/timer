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
  timer.timeBlocks.map(tb => {
    return !tb.end;
  }).reduce((acc, next) => {
    return acc || next;
  }, false)
);