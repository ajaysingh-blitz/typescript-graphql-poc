
import { NextFunction, Request, Response } from 'express';
import { jsonData } from '../config';
const filename = '../config/rendering_data';
import ProductService from '@/services/product.service';

class LocalJsonController {
    private productService = new ProductService();

    public getJsonData = async (req: Request, res: Response, next: NextFunction) => {
        console.log(`request ${req.headers}`);
        let data
        try {
          this.productService.getPageDetailsById("EeF9iVr5jC").then(result => {
            console.log(`inside getPageDetailsById`)
            data = result;
            console.log(`data is ${data}`)
            return res.status(200).json({
              data
            }); 
          });
          
        } catch (error) {
          next(error);
        }
      }; 
}

export default LocalJsonController;