import { Application } from "https://deno.land/x/oak/mod.ts";
import { renderFileToString } from 'https://deno.land/x/dejs@0.8.0/mod.ts';
import router from "./routes/todo-routes.ts";
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