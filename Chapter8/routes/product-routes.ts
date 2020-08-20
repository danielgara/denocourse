import { Router } from "https://deno.land/x/oak/mod.ts";
import getProductsCollection from "../helper/db.ts";

const router = new Router();

router.post("/products",async(ctx,next)=>{
    const data = await ctx.request.body({type:"json"}).value;
    const name = data.name;
    const description = data.description;
    const price = data.price;
    const id = await getProductsCollection().insertOne({
        name : name,
        description : description,
        price : price
    });
    ctx.response.body = {id : id.$oid};
});

router.get('/products', async (ctx,next) => {   
     
    const products = await getProductsCollection()!.find();
    
    const productsFormatted = products.map((product: any) => ({      
      id: product._id.$oid, 
      name: product.name,
      description: product.description,
      price: product.price          
    }));
        
    ctx.response.body = {products: productsFormatted};        
});

router.patch('/products/:productId', async (ctx) => {
    const data = await ctx.request.body({type: "json"}).value;
    const id = ctx.params.productId!;

    const updatedProduct = await getProductsCollection()!.updateOne(
        {_id: {$oid: id}},{$set: data}
    );
    
    ctx.response.body = {
        updatedProduct: updatedProduct
    };
});

router.delete('/products/:productId', async (ctx) => {
    const id = ctx.params.productId!;
    await getProductsCollection()!.deleteOne({_id:{$oid: id}});
    ctx.response.body = {
        message: "deleted " + id
    };
});

export default router;