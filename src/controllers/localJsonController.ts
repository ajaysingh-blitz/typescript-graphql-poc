
import { NextFunction, Request, Response } from 'express';
import { jsonData, jsonDataUI, carousel } from '../config';
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
            data = result.data.widgets;

            result.data.widgets.forEach((value, index) => {
              if(value.type == "collection_posters" && value.layout == "carousel") {
                console.log("inside foreach and for element type collection_posters and carousel")
                jsonDataUI.args.child.args.children[index] = carousel
              }
            });
            jsonData.args.values.entries.values = data;
            jsonData.args.child.args.body = jsonDataUI;

            console.log(`inside getPageDetailsById jsonDataUI ${jsonDataUI} and data = ${jsonData}`)

            return res.status(200).json({
              jsonData
            }); 
          });
          
        } catch (error) {
          next(error);
        }
      }; 
}

export default LocalJsonController;