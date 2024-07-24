import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import winston, { LoggerOptions } from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { LOG_DIR } from "../config";

class Logger{

     private logDir: string;
     private logger!: winston.Logger;
     private logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

    constructor(){
       this.logDir = join(__dirname, LOG_DIR);

       if (!existsSync(this.logDir)) {
        mkdirSync(this.logDir);
      }
    }

    
     initializeLogger():winston.Logger {
       this.logger = winston.createLogger({
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
              }),
              this.logFormat,
            ),
            transports: [
              // debug log setting
              new winstonDaily({
                level: 'debug',
                datePattern: 'YYYY-MM-DD',
                dirname: this.logDir + '/debug', // log file /logs/debug/*.log in save
                filename: `%DATE%.log`,
                maxFiles: 30, // 30 Days saved
                json: false,
                zippedArchive: true,
              }),
              // error log setting
              new winstonDaily({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: this.logDir + '/error', // log file /logs/error/*.log in save
                filename: `%DATE%.log`,
                maxFiles: 30, // 30 Days saved
                handleExceptions: true,
                json: false,
                zippedArchive: true,
              }),
            ],
          });

          this.logger.add(
            new winston.transports.Console({
              format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
            }),
          );

          const stream = {
            write: (message: string) => {
              this.logger.info(message.substring(0, message.lastIndexOf('\n')));
            },
          };
          return this.logger;
    }

      
      
}

export default Logger;


