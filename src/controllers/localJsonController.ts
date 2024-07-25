
import { NextFunction, Request, Response } from 'express';
import { jsonData } from '../config';
const filename = '../config/rendering_data';

class LocalJsonController {
    public getJsonData = async (req: Request, res: Response, next: NextFunction) => {
        console.log(`request ${req}`);
        try {
          return res.status(200).json({
            jsonData
          });
        } catch (error) {
          next(error);
        }
      }; 
}

export default LocalJsonController;