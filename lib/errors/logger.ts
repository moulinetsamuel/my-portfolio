import path from 'path';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(({ timestamp, message, ...meta }) => {
      const errorDetails = meta.error
        ? `\n${meta.error.name}: ${meta.error.message}\n${meta.error.stack}`
        : '';
      return `${timestamp} - ${message}${errorDetails}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'lib', 'errors', 'error.log'),
    }),
  ],
});

const logError = (message: string, error: unknown) => {
  logger.error({
    message: message,
    error: error instanceof Error ? error : new Error(String(error)),
  });
};

export default logError;
