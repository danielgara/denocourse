import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/product-routes.ts";
import { connect } from "./helper/db.ts";

const app = new Application();
connect();

//middleware to catch errors
app.use(async (ctx,next) =>{
    try{
      await next();
    }
    catch(err){
       console.log(err);
    }
});   

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });