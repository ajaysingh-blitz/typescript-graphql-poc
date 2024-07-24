import { Router } from "express";
import  express from "express";
import Logger from "./utils/logger";
import winston, { LoggerOptions } from "winston";
import { port } from './config';
import { Routes } from "./interfaces/route.interface";
export default class App{
    private app: express.Application;
    private port: string;
    private logger: winston.Logger;
    private env: string;
   private routes: Routes[];

    listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`=================================`);
            this.logger.info(`======= ENV: ${this.env} =======`);
            this.logger.info(`🚀 App listening on the port ${this.port}`);
            this.logger.info(`=================================`);
          });
    }

    constructor(routes: Routes[]){
        this.port = port
        this.app = express();
        this.logger = new Logger().initializeLogger();
        this.env = 'stage';
        this.routes = routes;
        this.initializeRoutes(routes);
        
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
          this.app.use('/', route.routes);
        });
      }


}