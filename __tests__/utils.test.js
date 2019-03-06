import * as utils from '../src/utils';
import timerdata from './timerdata';

test('this timer is active', () => {
  let timer = timerdata.items[2];
  expect(utils.isTimerActive(timer)).toBe(true);
});

test('this timer is inactive', () => {
  let timer = timerdata.items[0];
  expect(utils.isTimerActive(timer)).toBe(false);
})

test('retrieves the running timer', () => {
  let timer = utils.getActiveTimer(timerdata.items);
  expect(timer.name).toBe('job search');
});

test('this timer is active on this date', () => {
  let timer = utils.getActiveTimer(timerdata.items);
  let isActive = utils.isTimerActiveForDate(timer, "2019-03-06T00:00:00+11:00");
  expect(isActive).toBe(true);
});

test('this timer is not active on this date', () => {
  let timer = utils.getActiveTimer(timerdata.items);
  let isActive = utils.isTimerActiveForDate(timer, "2019-03-05T00:00:00+11:00");
  expect(isActive).toBe(false);
});

test('this timer is visible on this date', () => {
  let timer = utils.getActiveTimer(timerdata.items);
  expect
    (utils.isTimerVisibleForDate(timer, "2019-03-06T00:00:00+11:00"))
    .toBe(true);

});

test('this timer is not visible on this date', () => {
  let timer = utils.getActiveTimer(timerdata.items);
  expect
    (utils.isTimerVisibleForDate(timer, "2019-03-05T00:00:00+11:00"))
    .toBe(false);
});

test('time is within timeblocks', () => {
  return false
});

test('gets correct time format with seconds', () => {
  expect(utils.getTimeFormat(true))
    .toBe('HH:mm:ss');
});

test('gets correct time format without seconds', () => {
  expect(utils.getTimeFormat(false))
    .toBe('HH:mm');
});

// test('timer is inactive', () => {
//   expect(utils.isTimerActive(timer1)).toBe(false);
// });


// test('timer2 is active', () => {
//   expect(utils.isTimerActive(timer1)).toBe(true);
// });