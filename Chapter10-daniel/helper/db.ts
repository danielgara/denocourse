import { MongoClient } from "https://deno.land/x/mongo@v0.9.1/mod.ts";

class DB {

  public static client = new MongoClient();
  private static url = "mongodb+srv://adminuser:Hola1234.@clusterdeno.3h1po.mongodb.net/?retryWrites=true&w=majority";
  private static dbName = "todos";

  public static connect() {
    this.client.connectWithUri(this.url);
  }

  public static getDatabase(){
    return this.client.database(this.dbName);
  }

}

export default DB;