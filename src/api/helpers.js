/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */
export async function request(apiUrl) {
  const response = await fetch(apiUrl);
  return response.json();
}

/**
 * Checks if specified values in the data object are not empty, undefined, or null.
 *
 * @param {Object} data - The object to check for empty values.
 * @param {Array<string>} valuesToCheck - The keys of the values to check in the object.
 * @returns {boolean} - True if all specified values are not empty, undefined, or null, otherwise false.
 */
export function areRequiredValuesValid(data, valuesToCheck) {
  return valuesToCheck.every((key) => {
    const value = data[key];
    return value !== '' && value !== undefined && value !== null;
  });
}

/**
 * Checks if specified values in the data object are not empty, undefined, or null.
 *
 * @param {string} status - "fulfilled" or "rejected".
 * @param {object} value - object to be checked for required values.
 * @returns {boolean} - True if status is 'fulfilled' and all required values are present, otherwise false.
 */
export function isFulfilledWithValidValues({ status, value }) {
  return status === 'fulfilled' && areRequiredValuesValid(value, ['price', 'id']);
}
