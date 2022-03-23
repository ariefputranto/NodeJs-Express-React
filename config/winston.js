const fs = require('fs')
const winston = require('winston')
require('winston-daily-rotate-file')

const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Create logs directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
            level: LOG_LEVEL
        }),
        new winston.transports.DailyRotateFile({
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            maxFiles: '14d',
            dirname: LOG_DIR,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            filename: '%DATE%-log.log',
            level: LOG_LEVEL
        })
    ]
});

module.exports = logger;