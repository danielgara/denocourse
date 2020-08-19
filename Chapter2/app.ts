import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get('/',(ctx,next)=>{
    ctx.response.body = "<h1>The home page\n</h1>";
    ctx.response.type = 'text/html';
});

router.get('/about',(ctx,next)=>{
    ctx.response.body = "<h1>The about page\n</h1>";
    ctx.response.type = 'text/html';
});

router.get('/contact',(ctx,next)=>{
    ctx.response.body = "<h1>The contact page\n</h1>";
    ctx.response.type = 'text/html';
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });


/*import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx,next) => {
    console.log(ctx.request.url);
    console.log(ctx.request.method);
    ctx.response.body = "Hello World!";
    next();
});

app.use((ctx,next) => {
    ctx.response.body = "Hello World 3";
});

await app.listen({ port: 8000 });*/