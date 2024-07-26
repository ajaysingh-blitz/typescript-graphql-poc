
import PrashthInternal from '@/http/prashth.http';

class ProductService {
   private prashthInternal = new PrashthInternal();

   public getPageDetailsById  = async (pageId: string) => {
    console.log(`inside getPageDetailsById product service`)
     return this.prashthInternal.getPageDetailsById(pageId);
   }
}

export default ProductService;
