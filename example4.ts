import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

let n = 1;

app.use(ctx => {
  ctx.response.body = { greeting: `Hello #${++n}, DevDuck!` };
});

app.listen('localhost:8000');

console.log('Listening on http://localhost:8000/');

