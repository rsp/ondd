import { serve } from 'https://deno.land/std@v0.28.0/http/server.ts';

let n = 0;
const encoder = new TextEncoder();
const server = serve(':8000');
console.log('Listening on http://localhost:8000/');

for await (const req of server) {
  const message = `Hello #${++n}, C_tech!\n`;
  req.respond({ body: encoder.encode(message) });
}
