import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import localJsonController from '../controllers/LocalJsonController';
import LocalJsonController from '../controllers/LocalJsonController';


export default class ExternalRoute implements Routes {
  public path = '/api/v1/platform';
  public routes = Router();
  private localJsonController = new LocalJsonController();


  constructor() {
    this.initializeTransfornerRoutes(`${this.path}/transformer/browse`);
  }
   
  private initializeTransfornerRoutes(prefix: string) {
    this.routes.get(
        `${prefix}/`,
        this.localJsonController.getJsonData
    );
  }
}