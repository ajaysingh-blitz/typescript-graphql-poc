import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import { Routes } from '../interfaces/route.interface';

class IndexRoute{
  public path = '/health';
  public routes = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.routes.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
