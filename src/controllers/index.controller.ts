import { NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';

//Config
import { service_name } from '../config';

//DB conncection
//import { MONGO_CONNECTION_INSTANCES } from '@databases';
//const dbConnection = MONGO_CONNECTION_INSTANCES['dukandar_aadhar'];

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`request ${req}`);
    try {
      return res.status(200).json({ service: service_name });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
