import { renderFileToString } from 'https://deno.land/x/dejs@0.8.0/mod.ts';
import TodoModel from "../models/Todo.ts";

class TodoController{

    public static async getOne(ctx: any){
        const id = ctx.params.todoId!; 
        const todoObject = await TodoModel.findOne(id);

        const body = await renderFileToString(Deno.cwd()+'/views/todo.ejs',{
            todoObject: todoObject, 
            error: null      
        });

        ctx.response.body = body;
    }

    public static async getAll(ctx: any, next: any){
        const todoObjects = await TodoModel.find();
        const body = await renderFileToString(
            Deno.cwd()+"/views/todos.ejs",
            {
                title: "My TODOs",
                todoObjects: todoObjects,
                error: null
            }
        );
        ctx.response.body = body;
    }

    public static async add(ctx: any, next: any){
        const newTodoTitle = (await ctx.request.body({type:"form"}).value).get("new-todo");
        if(newTodoTitle && newTodoTitle.trim().length !== 0){
            const todoObject = new TodoModel();
            todoObject.setName(newTodoTitle);
            await TodoModel.insertOne(todoObject);
            ctx.response.redirect("/todos");
        }else{
            const todoObjects = await TodoModel.find();
            const body = await renderFileToString(
                Deno.cwd()+"/views/todos.ejs",
                {
                    title: "My TODOs",
                    todoObjects: todoObjects,
                    error: "Field cannot be empty"
                }
            );
            ctx.response.body = body;
        }
    }

    public static async delete(ctx: any){
        const id = ctx.params.todoId!;
        await TodoModel.deleteOne(id);
        ctx.response.redirect('/todos');
    }

    public static async update(ctx: any){
        const id = ctx.params.todoId!;
        const todoObject = await TodoModel.findOne(id);
        const updatedTodoTitle = (await ctx.request.body({type: "form"}).value).get('update-todo'); 
        if(updatedTodoTitle && updatedTodoTitle.trim().length !== 0){
            todoObject.setName(updatedTodoTitle);
            await TodoModel.updateOne(todoObject);
            ctx.response.redirect('/todos')
        }else{
            const body = await renderFileToString(Deno.cwd()+'/views/todo.ejs',{
                todoObject: todoObject, 
                error: "Field cannot be empty"
            });     
            ctx.response.body = body;            
        }
    }
}

export default TodoController;