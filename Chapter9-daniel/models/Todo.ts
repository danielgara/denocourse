import DB from '../helper/db.ts';

interface TodoSchema {
    _id: { $oid: string };
    name: string;
}

class TodoModel{
    public static todoCollection = DB.getDatabase().collection<TodoSchema>("todos");
}

export default TodoModel;