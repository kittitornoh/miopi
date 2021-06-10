/**
 * Truncate text to specified limit and add ellipses(...) at the end
 *
 * @param {*} text      String to truncate.
 * @param {*} limit     Integer to truncate at.
 * @returns             Truncated string with ellipses(...) at the end.
 */
export const truncateText = (text, limit) => {
  return `${text.substring(0, limit)}...`;
};
