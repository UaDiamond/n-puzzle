import expect from 'expect';
import df from 'deep-freeze-strict';

import TimeAPI from 'TimeAPI';


describe('TimeAPI', () => {
  it('should exist', () => {
    expect(TimeAPI).toExist();
  });


  describe('getDiffInSecondsFromMoment', () => {
    it('should calculate difference in seconds from passed timestamp to now', () => {
      const expectedSeconds = df(564),
        testTimestamp = df(Date.now() - expectedSeconds*1000);

      const actual = TimeAPI.getDiffInSecondsFromMoment(testTimestamp);

      expect(actual).toBeA('number');
      expect(actual).toBe(expectedSeconds);
    });
  });


  describe('formatSecondsForOutput', () => {
    it('should properly format time less than 10 seconds', () => {
      const seconds = df(7),
        expected = df('00 07');

      const actual = df(TimeAPI.formatSecondsForOutput(seconds));

      expect(actual).toBe(expected);
    });


    it('should properly format time less than 10 minutes', () => {
      const seconds = df(542),
        expected = df('09:02');

      const actual = df(TimeAPI.formatSecondsForOutput(seconds));

      expect(actual).toBe(expected);
    });


    it('should properly format time greater than 1 hour', () => {
      const seconds = df(3602),
        expected = df('01:00:02');

      const actual = df(TimeAPI.formatSecondsForOutput(seconds));

      expect(actual).toBe(expected);
    });


    it('should show colon with even number of seconds', () => {
      const actual = TimeAPI.formatSecondsForOutput(df(4));

      expect(actual).toInclude(':');
    });


    it('should not show colon with odd number of seconds', () => {
      const actual = TimeAPI.formatSecondsForOutput(df(5097));

      expect(actual).toExclude(':');
    });


    it('should always show colon in output', () => {
      const test1 = TimeAPI.formatSecondsForOutput(df(3), true),
        test2 = TimeAPI.formatSecondsForOutput(df(4), true);

      expect(test1).toInclude(":");
      expect(test2).toInclude(":");
    });
  });
});