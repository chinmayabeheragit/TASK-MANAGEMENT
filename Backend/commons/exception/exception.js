const statusCode = require("../utils/statusCode");

module.exports = {
  /**
   * Generates a structured error object for exceptions.
   *
   * @param {number} errorCode - Application-specific error code (defaults to SERVER_ERROR if not provided).
   * @param {string} message - Internal message for debugging purposes.
   * @param {string} displayMessage - User-facing error message.
   * @param {number} [customStatusCode] - Optional custom HTTP status code.
   * @param {object} [customData] - Additional custom data for context or debugging.
   * @returns {object} - Structured error object.
   */
  error: (errorCode, message, displayMessage, customStatusCode, customData) => {
    // Default to SERVER_ERROR if no error code is provided.
    if (!errorCode) errorCode = statusCode.SERVER_ERROR;

    // Return error object based on the provided parameters.
    return {
      errorCode,
      message,
      displayMessage,
      customStatusCode: customStatusCode || null,
      customData: customData || null,
    };
  },
};
