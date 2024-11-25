const statusCode = require("../utils/statusCode");

module.exports = {
  /**
   * Generates a standardized error response object.
   *
   * @param {number} errorCode - The default error code (fallback: SERVER_ERROR).
   * @param {string} message - Internal error message for developers.
   * @param {string} displayMessage - Error message to display to end users.
   * @param {number} customStatusCode - Optional custom status code for HTTP response.
   * @param {object} customData - Optional additional data related to the error.
   * @returns {object} - Standardized error object.
   */
  error: (errorCode, message, displayMessage, customStatusCode, customData) => {
    if (!errorCode) errorCode = statusCode.SERVER_ERROR;

    if (!customStatusCode) {
      return {
        errorCode,
        message,
        displayMessage,
      };
    }

    return {
      errorCode,
      message,
      displayMessage,
      customStatusCode,
      customData,
    };
  },
};
