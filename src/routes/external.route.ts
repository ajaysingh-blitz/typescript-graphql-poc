import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import LocalJsonController from '../controllers/localJsonController';


export default class ExternalRoute {
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