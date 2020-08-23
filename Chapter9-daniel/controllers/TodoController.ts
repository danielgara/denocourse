import { renderFileToString } from 'https://deno.land/x/dejs@0.8.0/mod.ts';
import TodoModel from "../models/Todo.ts";

class TodoController{

    public static async getOne(ctx: any){
        const id = ctx.params.todoId!; 
        const todo = await TodoModel.todoCollection.findOne({ _id: { $oid: id } });
    
        if(!todo){
        throw new Error('did not find todo') 
        }
        
        const body = await renderFileToString(Deno.cwd()+'/views/todo.ejs',{
            todoText: todo.name, 
            todoId: todo._id.$oid,
            error: null      
        });

        ctx.response.body = body;
    }

    public static async getAll(ctx: any, next: any){
        const todos = await TodoModel.todoCollection.find();
        const body = await renderFileToString(
            Deno.cwd()+"/views/todos.ejs",
            {
                title: "My TODOs",
                todos: todos,
                error: null
            }
        );
        ctx.response.body = body;
    }

    public static async add(ctx: any, next: any){
        const newTodoTitle = (await ctx.request.body({type:"form"}).value).get("new-todo");
        if(newTodoTitle && newTodoTitle.trim().length !== 0){
            const newTodo = {
                name : newTodoTitle
            };
            await TodoModel.todoCollection.insertOne(newTodo);
            ctx.response.redirect("/todos");
        }else{
            const todos = await TodoModel.todoCollection.find();
            const body = await renderFileToString(
                Deno.cwd()+"/views/todos.ejs",
                {
                    title: "My TODOs",
                    todos: todos,
                    error: "Field cannot be empty"
                }
            );
            ctx.response.body = body;
        }
    }

    public static async delete(ctx: any){
        const id = ctx.params.todoId!;
        await TodoModel.todoCollection.deleteOne({ _id: {$oid: id} });
        ctx.response.redirect('/todos');
    }

    public static async update(ctx: any){
        const id = ctx.params.todoId!; 
        const todo = await TodoModel.todoCollection.findOne({ _id: { $oid: id } });

        if(!todo){
            throw new Error('did not find todo');
        }

        const updatedTodoTitle = (await ctx.request.body({type: "form"}).value).get('update-todo'); 

        if(updatedTodoTitle && updatedTodoTitle.trim().length !== 0){
            await TodoModel.todoCollection.updateOne(
                { _id: {$oid: id}},
                { $set: { name: updatedTodoTitle } }
            );
            ctx.response.redirect('/todos')
        }
        else{
            const body = await renderFileToString(Deno.cwd()+'/views/todo.ejs',{
                todoText: todo.name,
                todoId: todo._id.$oid,
                error: "Field cannot be empty"
            });     
            ctx.response.body = body;            
        }
    }
}

export default TodoController;