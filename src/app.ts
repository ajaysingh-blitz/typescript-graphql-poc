import  express from "express";
import {logger, stream} from "./utils/logger";
import winston, { LoggerOptions } from "winston";
import { port } from './config';
import { Routes } from "./interfaces/route.interface";

export default class App{
    private app: express.Application;
    private port: string;
    private env: string;
   private routes: Routes[];
   
   public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

    constructor(routes: Routes[]){
        this.port = port
        this.app = express();
        this.env = 'stage';
        this.routes = routes;
        this.initializeRoutes(routes)
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
          this.app.use('/', route.routes);
        });
    }
}