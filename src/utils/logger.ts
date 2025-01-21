import fs from 'fs/promises';
import moment from 'moment';
import path from 'path';

/**
 * @class Logger
 * @classdesc Handles logging of messages with different levels and optional error information.
 */
export class Logger {
    /**
     * Directory where log files are stored.
     * 
     * @private
     * @property {string} logDir
     */
    private static logDir: string = path.resolve("/app","src", "logs");

    /**
     * Current log file name, based on the date.
     * 
     * @private
     * @property {string} logFile
     */
    private static logFile: string = "";

    /**
     * Current log file path.
     * 
     * @private
     * @property {string} logFile
     */
    private static logPath: string = "";

    /**
     * Maximum size of the log file in bytes.
     * 
     * @private
     * @property {number} maxLogSize
     */
    private static maxLogSize: number = 10 * 1024 * 1024; // 10 MB

    /**
     * Set log file path
     * 
     * @param {string} fileName 
     */
    private static async setLogPath(fileName: string) {
        Logger.logFile = fileName;
        Logger.logPath = `${Logger.logDir}/${fileName}`;
    }

    /**
     * Logs a message with a specific level and optional error information.
     * 
     * @param {string} level - The log level (e.g., 'info', 'warn', 'error', 'debug')
     * @param {string} message - The message to log.
     * @param {Error} [error] - Optional error object to log the stack trace.
     */
    static async log(level: string, message: string, error?: Error) {
        try {
            if(Logger.logPath == "") {
                await Logger.setLogPath(`log-${moment().format("YYYYMMDD")}.log`);
            }
            
            await Logger.checkLogSize();

            let logMessage = `${moment().format("YYYYMMDD HH:mm:ss")} [${level.toUpperCase()}]: ${message}\n`; 
            if(error) {
                logMessage += `Stack: ${error.stack}\n`
            }

            await fs.appendFile(Logger.logPath, logMessage);
        } catch(err) {
            console.error("Logger-Error", err);
        }
    }

    /**
     * Checks the size of the current log file and rotates it if necessary.
     * 
     * @private
     */

    private static async checkLogSize() {
        try {
            await fs.access(Logger.logPath, fs.constants.R_OK);
            const stats = await fs.stat(Logger.logPath);
            if(stats.size >= Logger.maxLogSize ) {
                Logger.setLogPath(`log-${moment().format("YYYYMMDD")}-${moment().format('HHmmss')}.log`);
            }
        } catch(err) {
            console.error("Logger-Error", err);
        }
    }

    /**
     * log the info mesgae
     * 
     * @param { string } message 
     */
    static info(message: string) {
        Logger.log('info', message);
    }

    /**
     * log the warning mesgae
     * 
     * @param {string} message 
     */
    static warn(message: string) {
        Logger.log('warn', message);
    }

    /**
     * Logs an error message with optional error details.
     * 
     * @param {string} message
     * @param {Error} [error]
     */
    static error(message: string, error?: Error) {
        Logger.log('error', message, error);
    }

    /**
     * Log the debug message
     * 
     * @param {string} message 
     */
    static debug(message: string) {
        Logger.log('debug', message);
    }
}