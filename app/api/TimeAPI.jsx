class TimeAPI {
  /**
   * Get difference in seconds between now and passed timestamp
   *
   * @param timestamp UNIX timestamp
   *
   * @returns {number} seconds
   */
  static getDiffInSecondsFromMoment(timestamp) {
    return Math.round((Date.now() - timestamp) / 1000);
  }


  /**
   * Format seconds to [hh:]mm:ss
   *
   * @param totalSeconds
   * @param alwaysShowColon
   *
   * @returns {string} formatted time string
   */
  static formatSecondsForOutput(totalSeconds, alwaysShowColon = false) {
    if (!totalSeconds) totalSeconds = 0;

    const hours = Math.floor(totalSeconds / 3600),
      minutes = Math.floor(totalSeconds / 60) - (hours ? hours * 60 : 0),
      seconds = totalSeconds % 60;

    const formattedHours = (hours < 10) ? '0' + hours : hours,
      formattedMinutes = (minutes < 10) ? '0' + minutes : minutes,
      formattedSeconds = (seconds < 10) ? '0' + seconds : seconds;

    // show colon when number of seconds is even
    const colon = !(seconds % 2) || alwaysShowColon ? ':' : ' ';

    return (hours ? formattedHours + colon : '') + formattedMinutes + colon + formattedSeconds;
  }
}


export default TimeAPI;