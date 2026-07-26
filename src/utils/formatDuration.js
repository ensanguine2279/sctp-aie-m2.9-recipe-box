/**
 * Formats a given number of minutes into a human-readable string.
 * @param {number} minutes - The total number of minutes.
 * @returns {string} Formatted duration (e.g., "35 min" or "1 hr 15 min").
 */
export function formatDuration(minutes) {
  if (typeof minutes !== "number" || isNaN(minutes) || minutes < 0) {
    return "0 min";
  }

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hrs} hr`;
  }

  return `${hrs} hr ${mins} min`;
}
