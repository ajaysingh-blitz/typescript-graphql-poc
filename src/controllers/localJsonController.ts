
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
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              } 
              else if(value.type == "testimonial" && value.layout == "carousel"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "content_text_and_media" && value.layout == "multiple"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "product_group" && value.layout == "carousel"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "product_group" && value.layout == "grid"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "video_cross_link" && value.layout == "single"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "video_cross_link" && value.layout == "multiple"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "banner_cross_link" && value.layout == "multiple"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "banner_cross_link_full" && value.layout == "single"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "website_navigator" && value.layout == "single"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
              }
              else if(value.type == "product_list" && value.layout == "carousel"){
                console.log(`inside foreach and for value type ${value.type} and ${value.layout}`)
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