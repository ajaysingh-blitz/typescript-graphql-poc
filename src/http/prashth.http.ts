import fetch from "node-fetch";
import { prashth } from "../config";

export default class PrashthInternal {
  private prashthInternal = prashth;

   /**
   * Fetches page details info with page id
   * @param {string} pageId
   * @returns
   */
   public getPageDetailsById = async (pageId: string) => {
    const headers = {
      'Accept': 'application/json', 
      'wm_platform_os': 'android',
      'wm_seller_website' : 'rudra.stage.sdloki.in',
      'wm_visitor_id' : '35b647f0-4a8c-11ef-829e-67da6ea1276d',
      'wm_device_type' : 'mobile',
      'shopdeck_app_version' : '2.0',
      'app_version' : '1.0'
    };
  
    try {
      const response = await fetch(`http://rudra.stage.sdloki.in/api/prashth/page/?page_no=0&page_size=5&sale_id=`, {
        method: 'GET',
        headers: headers
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data
      console.log(data);
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  };
}