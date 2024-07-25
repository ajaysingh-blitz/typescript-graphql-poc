import { prashth } from "../config";

export default class PrashthInternal {
  private prashthInternal = prashth;

   /**
   * Fetches page details info with page id
   * @param {string} pageId
   * @returns
   */
   public getPageDetailsById = async (pageId: string) => {
    return await fetch(`${this.prashthInternal}/page/get-page-info-by-id/${pageId}`, {
      method: 'GET',
    }).then(res => res);
  };
}