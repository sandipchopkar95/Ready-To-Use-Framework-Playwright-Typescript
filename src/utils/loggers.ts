import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Define log file path inside playwright-report
const logFilePath = path.join(__dirname, '../../playwright-report/test.log');

// Ensure the playwright-report directory exists
const reportDir = path.dirname(logFilePath);
if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
}

export const logger = winston.createLogger({
    level: 'info', // Log level (info, debug, warn, error)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: logFilePath }) // Store log in playwright-report
    ]
});
