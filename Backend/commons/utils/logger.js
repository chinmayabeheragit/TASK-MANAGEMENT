const winston = require("winston");

// Define the log format
const logFormat = winston.format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create a winston logger instance
const logger = winston.createLogger({
  level: "info", // Set default logging level to 'info'
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.splat(), // Allows string interpolation in log messages
    logFormat // Use the custom log format
  ),
  transports: [
    // Output logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Add color to the console logs
        winston.format.simple() // Format for console logs
      ),
    }),
    // Output logs to a file (optional)
    new winston.transports.File({
      filename: "logs/app.log", // Path to log file
      level: "info", // Log level to write to file
    }),
  ],
});

// To log errors with stack trace
logger.logError = (message, error) => {
  if (error instanceof Error) {
    logger.error(`${message} - ${error.stack}`);
  } else {
    logger.error(message);
  }
};

module.exports = logger;
