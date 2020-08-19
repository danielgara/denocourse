import { serve } from "https://deno.land/std/http/server.ts";
const body = "Hello World\n";
const server = serve({ port: 8000 });
for await (const req of server) {
    const headers = new Headers();
    headers.set('Content-Type', 'text/html');
    if (req.url === '/about')
        req.respond({
            body: "<h1>The about page\n</h1>",
            headers: headers
        });
    else if (req.url === '/contact')
        req.respond({
            body: "<h1>The contact page\n</h1>",
            headers: headers
        });
    else if (req.url === '/')
        req.respond({
            body: "<h1>The home page\n</h1>",
            headers: headers
        });
    else {
        req.respond({
            body: "<h1>page not found\n</h1>",
            headers: headers, status: 404
        });
    }
}

/*import { serve } from "https://deno.land/std@0.63.0/http/server.ts";

const s = serve({port:8000});

for await (const req of s){
    req.respond({body: "Hello"});
}*/