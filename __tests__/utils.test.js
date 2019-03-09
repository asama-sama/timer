import * as utils from '../src/utils';
import timerdata from './timerdata.json';

describe('isTimerActive', () => {
  test('this timer is active', () => {
    const timer = timerdata.items[2];
    expect(utils.isTimerActive(timer)).toBe(true);
  });

  test('this timer is inactive', () => {
    const timer = timerdata.items[0];
    expect(utils.isTimerActive(timer)).toBe(false);
  });
});

describe('getActiveTimer', () => {
  test('retrieves the running timer', () => {
    const timer = utils.getActiveTimer(timerdata.items);
    expect(timer.name).toBe('job search');
  });
});

describe('isTimerActiveForDate', () => {
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
});

describe('isTimerVisibleForDate', () => {
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
});

describe('timeWithinTimeBlocks', () => {
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
});

describe('getTimeFormat', () => {
  test('gets correct time format with seconds', () => {
    expect(utils.getTimeFormat(true))
      .toBe('HH:mm:ss');
  });

  test('gets correct time format without seconds', () => {
    expect(utils.getTimeFormat(false))
      .toBe('HH:mm');
  });
});


describe('getTimerByName', () => {
  test('gets the correct timer by name', () => {
    expect(
      utils.getTimerByName(
        'trying to chill',
        timerdata.items
      ).name
    ).toBe('trying to chill');
  });

  test('does not get incorrect timer', () => {
    expect(
      utils.getTimerByName(
        'frontend',
        timerdata.items
      ).name
    ).not.toBe('trying to chill');
  });
});
