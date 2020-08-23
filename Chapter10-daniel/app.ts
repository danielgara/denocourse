import { Application } from "https://deno.land/x/oak/mod.ts";
import { Router } from "https://deno.land/x/oak/mod.ts";
import DB from "./helper/db.ts";
import TodoController from "./controllers/TodoController.ts";

class Principal{

  private static app = new Application();
  private static router = new Router();

  public static main(){
    this.dbConnection();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.startApp();
  }

  private static dbConnection(){
    DB.connect();
  }

  private static initializeMiddlewares(){
    this.app.use(async (ctx,next) =>{
      try{
        await next();
      }
      catch(err){
         console.log(err);
      }
    }); 
  }

  private static initializeRoutes(){
    this.router.get('/todos',async (ctx,next)=>{ return TodoController.getAll(ctx,next); });
    this.router.post('/todos/add',async (ctx,next)=>{ return TodoController.add(ctx,next); });
    this.router.post('/todos/delete/:todoId',async (ctx)=>{ return TodoController.delete(ctx); });
    this.router.get('/todos/:todoId',async (ctx)=>{ return TodoController.getOne(ctx); });
    this.router.post('/todos/update/:todoId',async (ctx)=>{ return TodoController.update(ctx); });

    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }

  private static async startApp(){
    await this.app.listen({ port: 8000 });
  }

}

Principal.main();