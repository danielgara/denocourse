import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { renderFileToString } from 'https://deno.land/x/dejs@0.8.0/mod.ts';

const app = new Application();
const router = new Router();

router.get('/',async (ctx,next)=>{
    const todos: {id: String, name: String }[] = [
        {id: "1",name: "Learn Deno"},
        {id: "2",name: "Prepare lunch"},
        {id: "3",name: "Read bible"}
    ];
    const body = await renderFileToString(
        Deno.cwd()+"/todo.ejs",
        {
            title: "My TODOs",
            todos: todos
        }
    );
    ctx.response.body = body;
});

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