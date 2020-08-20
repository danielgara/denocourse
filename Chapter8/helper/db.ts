import { MongoClient, Collection } from "https://deno.land/x/mongo@v0.9.1/mod.ts";

// Defining schema interface
interface ProductSchema {
  _id: { $oid: string };
  name: string;
  description : string;
  price : number;
}

let productsCollection : Collection<ProductSchema>; 

export function connect(){
    const client = new MongoClient();

    client.connectWithUri("mongodb+srv://adminuser:Hola1234.@clusterdeno.3h1po.mongodb.net/?retryWrites=true&w=majority");
    
    const db = client.database("products");
    productsCollection = db.collection<ProductSchema>("products");
}
    
function getProductsCollection(){
    return productsCollection;
}
    
export default getProductsCollection;