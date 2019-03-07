import * as utils from '../src/utils';
import timerdata from './timerdata';

test('this timer is active', () => {
  const timer = timerdata.items[2];
  expect(utils.isTimerActive(timer)).toBe(true);
});

test('this timer is inactive', () => {
  const timer = timerdata.items[0];
  expect(utils.isTimerActive(timer)).toBe(false);
});

test('retrieves the running timer', () => {
  const timer = utils.getActiveTimer(timerdata.items);
  expect(timer.name).toBe('job search');
});

test('this timer is active on this date', () => {
  const timer = utils.getActiveTimer(timerdata.items);
  const isActive = utils.isTimerActiveForDate(timer, '2019-03-06T00:00:00+11:00');
  expect(isActive).toBe(true);
});

test('this timer is not active on this date', () => {
  const timer = utils.getActiveTimer(timerdata.items);
  const isActive = utils.isTimerActiveForDate(timer, '2019-03-05T00:00:00+11:00');
  expect(isActive).toBe(false);
});

test('this timer is visible on this date', () => {
  const timer = utils.getActiveTimer(timerdata.items);
  expect(utils.isTimerVisibleForDate(timer, '2019-03-06T00:00:00+11:00'))
    .toBe(true);
});

test('this timer is not visible on this date', () => {
  const timer = utils.getActiveTimer(timerdata.items);
  expect(utils.isTimerVisibleForDate(timer, '2019-03-05T00:00:00+11:00'))
    .toBe(false);
});

test('time is within a sibling timeblock', () => {
  const within = utils.timeWithinTimeBlocks(
    'd032684c-c213-49b8-9c81-5bafc9d99e89',
    '2019-03-05T18:09:33+11:00',
    timerdata.items
  );
  expect(within).toBe(true);
});

test('time is within it\'s own timeblock', () => {
  const within = utils.timeWithinTimeBlocks(
    'd032684c-c213-49b8-9c81-5bafc9d99e89',
    '2019-03-05T15:39:38+11:00',
    timerdata.items
  );
  expect(within).toBe(false);
});

test('time is outside any timeblock', () => {
  const within = utils.timeWithinTimeBlocks(
    'd032684c-c213-49b8-9c81-5bafc9d99e89',
    '2019-03-15T15:39:38+11:00',
    timerdata.items
  );
  expect(within).toBe(false);
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