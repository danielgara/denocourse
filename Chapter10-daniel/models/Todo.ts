import DB from '../helper/db.ts';

interface TodoSchema {
    _id: { $oid: string };
    name: string;
}

class TodoModel{
    public static todoCollection = DB.getDatabase().collection<TodoSchema>("todos");
    private id : string;
    private name : string;

    constructor(id: string = "", name: string = "") {
        this.id = id;
        this.name = name;
    }

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public static async findOne(id: string){
        const todo = await TodoModel.todoCollection.findOne({ _id: { $oid: id } });

        if(!todo){
            throw new Error('did not find todo');
        }

        const todoObject = new TodoModel(todo._id.$oid, todo.name);
        return todoObject;
    }

    public static async find(){
        const todos = await TodoModel.todoCollection.find();
        let todoObjects = [];
        for (let i = 0; i < todos.length; i++) {
            const todoObject = new TodoModel(todos[i]._id.$oid, todos[i].name);
            todoObjects.push(todoObject);
        }
        return todoObjects;
    }

    public static async insertOne(todoObject: TodoModel){
        const newTodo = {
            name : todoObject.getName()
        };
        await TodoModel.todoCollection.insertOne(newTodo);
    }

    public static async updateOne(todoObject: TodoModel){
        await TodoModel.todoCollection.updateOne(
            { _id: {$oid: todoObject.getId()}},
            { $set: { name: todoObject.getName() } }
        );
    }

    public static async deleteOne(id: string){
        await TodoModel.todoCollection.deleteOne({ _id: {$oid: id} });
    }
}

export default TodoModel;