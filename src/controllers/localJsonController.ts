
import { NextFunction, Request, Response } from 'express';
import { jsonData, jsonDataUI } from '../config';
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

            result.data.widgets.forEach(element => {
              if(element.type == "collection_posters" && element.layout == "carousel") {
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              } 
              else if(element.type == "testimonial" && element.layout == "carousel"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "content_text_and_media" && element.layout == "multiple"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "product_group" && element.layout == "carousel"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "product_group" && element.layout == "grid"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "video_cross_link" && element.layout == "single"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "video_cross_link" && element.layout == "multiple"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "banner_cross_link" && element.layout == "multiple"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "banner_cross_link_full" && element.layout == "single"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "website_navigator" && element.layout == "single"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
              }
              else if(element.type == "product_list" && element.layout == "carousel"){
                console.log(`inside foreach and for element type ${element.type} and ${element.layout}`)
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