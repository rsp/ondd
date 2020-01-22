import { serve } from 'https://deno.land/std@v0.30.0/http/server.ts';

const server = serve({ port: 8000 });
console.log('Listening on http://localhost:8000/');

for await (const req of server) {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'GET') {
    try {
      req.respond({ body: await Deno.readFile(`.${req.url}`) });
    } catch (e) {
      console.log(e);
      req.respond({ status: 404, body: 'Not Found' });
    }
  } else {
    req.respond({ status: 405, body: 'Method Not Allowed' });
  }
}
