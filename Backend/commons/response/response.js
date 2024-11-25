const statusCode = require("../utils/statusCode.js");
const constants = require("../constant/error.js");
const logger = require("../utils/logger.js"); // Assuming you have a logger utility

/**
 * Helper function to create response objects.
 * @param {boolean} status - Whether the response is successful or not.
 * @param {number} httpStatusCode - The HTTP status code.
 * @param {string} message - Developer-facing message.
 * @param {string} displayMessage - User-facing message.
 * @param {Object|null} result - The data returned in the response.
 * @returns {Object} The formatted response object.
 */
const createResponse = (status, httpStatusCode, message, displayMessage, result = null) => ({
  status,
  httpStatusCode,
  message,
  displayMessage,
  result,
});

/**
 * Returns a success response object.
 * @param {Object|null} data - The main response data.
 * @param {number} [httpStatusCode=200] - HTTP status code.
 * @param {string|null} [message=null] - Developer message.
 * @param {string} [displayMessage="Success"] - User-facing display message.
 * @param {number|null} [customStatusCode=null] - Custom status code for application-specific errors.
 * @param {Object|null} [customData=null] - Additional custom data.
 * @returns {Object} The success response object.
 */
module.exports.successWith = (
  data = null,
  httpStatusCode = statusCode.SUCCESS_CODE,
  message = null,
  displayMessage = constants.successMessage,
  customStatusCode = null,
  customData = null
) => createResponse(true, httpStatusCode, message, displayMessage, { data, customData });

/**
 * Returns an error response object.
 * @param {number} [httpStatusCode=500] - HTTP status code.
 * @param {string|null} [message=null] - Developer-facing message.
 * @param {string} [displayMessage="Unknown error occurred"] - User-facing display message.
 * @param {number|null} [customStatusCode=null] - Custom status code for application-specific errors.
 * @param {Object|null} [customData=null] - Additional custom data.
 * @returns {Object} The error response object.
 */
module.exports.errorWith = (
  httpStatusCode = statusCode.SERVER_ERROR,
  message = null,
  displayMessage = constants.unknownErrorMessage,
  customStatusCode = null,
  customData = null
) => createResponse(false, httpStatusCode, message, displayMessage, { data: null, customData });

/**
 * Handles error response by logging and sending the response.
 * @param {Object} errorObj - The error object containing error details.
 * @param {Object} res - The response object from Express.
 */
module.exports.handleErrorResponse = (errorObj, res) => {
  const httpStatusCode = errorObj.errorCode || statusCode.SERVER_ERROR;
  // Log the error for debugging purposes
  logger.error({
    errorCode: httpStatusCode,
    message: errorObj.message,
    stack: errorObj.stack || "No stack trace",
  });

  return res
    .status(httpStatusCode)
    .json(
      module.exports.errorWith(
        httpStatusCode,
        errorObj.message,
        errorObj.displayMessage,
        errorObj.customStatusCode
      )
    );
};

/**
 * Handles success response by sending the response with the provided data.
 * @param {Object} data - The data to send in the success response.
 * @param {Object} res - The response object from Express.
 * @param {string|null} [message=null] - Developer-facing message.
 * @param {string} [displayMessage="Success"] - User-facing display message.
 */
module.exports.handleSuccessResponse = (
  data,
  res,
  message = null,
  displayMessage = constants.successMessage
) => {
  const httpStatusCode = statusCode.SUCCESS_CODE;
  return res
    .status(httpStatusCode)
    .json(
      module.exports.successWith(
        data,
        httpStatusCode,
        message,
        displayMessage
      )
    );
};

/**
 * Returns a validation error response object.
 * @param {Object} errors - The validation errors.
 * @param {string} [displayMessage="Validation failed"] - User-facing display message.
 * @returns {Object} The validation error response object.
 */
module.exports.validationError = (errors, displayMessage = "Validation failed") => {
  return {
    httpStatusCode: 400,
    customStatusCode: 1001, // Example custom code
    result: { data: null, errors },
    message: "Validation error",
    displayMessage,
    status: false,
  };
};

/**
 * Returns an authentication error response object.
 * @param {string} [displayMessage="Authentication failed"] - User-facing display message.
 * @returns {Object} The authentication error response object.
 */
module.exports.authenticationError = (displayMessage = "Authentication failed") => {
  return {
    httpStatusCode: 401,
    customStatusCode: 1002, // Example custom code
    result: { data: null },
    message: "Authentication error",
    displayMessage,
    status: false,
  };
};

/**
 * Default responses for common success and error cases.
 */
module.exports.defaultResponses = {
  success: module.exports.successWith(null, 200, null, constants.successMessage),
  error: module.exports.errorWith(500, null, constants.unknownErrorMessage),
};
