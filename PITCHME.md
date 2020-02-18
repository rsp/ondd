# Od Node.js<br>do Deno

<img src="deno-c.png" height="200"><br>

Nowoczesny backendowy runtime <br>
dla JavaScript i TypeScript na rok 2020

---

# Rafał Pocztarski

Możecie mnie znać ze Stack Overflow

[<img alt="rsp on Stack Overflow" src="https://stackexchange.com/users/flair/303952.png" height="116">](https://stackoverflow.com/users/613198/rsp)

# pocztarski.com

<small>(oraz z GitHuba, Medium, Quora, etc.)</small>

---

# Slajdy

<big><big> [pocztarski.com/ondd](https://pocztarski.com/ondd) </big></big>

Przykłady

[github.com/rsp/ondd/tree/ondd](https://github.com/rsp/ondd/tree/ondd)

---

evented I/O for v8 javascript

---

A secure TypeScript runtime on V8

---

# Architektura 

Node = Server-side JS (V8 + libuv w C++)

Deno = Server-side TS (V8 + Tokio w Rust)

---

# Podejście

“The only thing that matters in software<br>is the experience of the user.”<br><br>- Ryan Dahl

---

# Historia

2009 Node.js

2012 TypeScript

2015 ts-node

2018 Deno

---

# Instalacja

Dla odważnych:<br><small>
`curl -fsSL https://deno.land/x/install/install.sh | sh`<br>
`iwr https://deno.land/x/install/install.ps1 | iex` </small>

Dla rozważnych:<br>
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases)

---

# DENO.LAND

---

# Użycie

```bash
deno run script.ts
```

```bash
deno run https://pocztarski.com/hi.ts
```

---

# Program

```bash
$ curl https://pocztarski.com/hi.ts
```

```ts
import { hello } from './hello.ts';

hello('DevDuck');
```

---

# Biblioteka

```bash
$ curl https://pocztarski.com/hello.ts
```

```ts
export function hello(name: string = 'world'): void {
  console.log(`Hello, ${name}!`);
}
```

---

# Pierwsze uruchomienie

```bash
$ deno run https://pocztarski.com/hi.ts
```

```text
Download https://pocztarski.com/hi.ts
Compile https://pocztarski.com/hi.ts
Download https://pocztarski.com/hello.ts
Hello, DevDuck!
```

---

# Ponowne uruchomienie

```bash
$ deno run https://pocztarski.com/hi.ts
```

```text
Hello, DevDuck!
```

---

# Bezpieczeństwo

```bash
deno run --allow-write script.ts
```

```bash
deno run --allow-net script.ts
```

---

# Uprawnienia

Domyślnie brak dostępu do sieci i dysku

```text
-A, --allow-all                  all permissions
    --allow-env                  environment access
    --allow-hrtime               high resolution time measurement
    --allow-net=<allow-net>      network access
    --allow-read=<allow-read>    file system read access
    --allow-run                  running subprocesses
    --allow-write=<allow-write>  file system write access
```

---

# Przykłady

```bash
$ deno run --allow-read=/etc/file.txt script.ts
```

```bash
$ deno run --allow-write=/tmp script.ts
```

```bash
$ deno run --allow-net script.ts
```

---

# Biblioteki

- [deno.land/typedoc](https://deno.land/typedoc/)
- [deno.land/std](https://deno.land/std/)
- [deno.land/x](https://deno.land/x/)

---

# Użycie bibliotek

(z błędem)

```bash
$ cat example1.ts
```
```ts
import { rand } from 'https://deno.land/x/rand/mod.ts';

const x = rand.r8(); // error

console.log(x);
```

---

# TypeScript w akcji

```bash
$ deno run example1.ts
```
```text
Compile file:///Users/rsp/talks/git/ondd/example1.ts
error TS2339: Property 'r8' does not exist on type ...

► file:///Users/rsp/talks/git/ondd/example1.ts:3:16

3 const x = rand.r8(); // error
                 ~~
```

---

# Użycie bibliotek

```bash
$ cat example2.ts
```
```ts
import { rand } from 'https://deno.land/x/rand/mod.ts';

const x = rand.s8();

console.log(x);
```

---

# Uruchomienie

```bash
$ deno run example2.ts
```
```text
-58
```

---

# Serwer

```ts
import { serve } from 'https://deno.land/std@v0.28.0/http/server.ts';

let n = 0;

const encoder = new TextEncoder();
const server = serve(':8000');
console.log('Listening on http://localhost:8000/');

for await (const req of server) {
  const message = `Hello #${++n}, DevDuck!\n`;
  req.respond({ body: encoder.encode(message) });
}
```

---

[<img src="pr3705.png" alt="PR 3705">](https://github.com/denoland/deno/pull/3705)

---

# Framework Oak

```ts
import { Application } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();

let n = 1;

app.use(ctx => {
  ctx.response.body = { greeting: `Hello #${++n}, DevDuck!` };
});

app.listen('localhost:8000');

console.log('Listening on http://localhost:8000/');
```

---

# Brak uprawnień

```bash
$ deno run --reload example4.ts 
```
```text
Compile file:///Users/rsp/talks/git/ondd/example4.ts
Download https://deno.land/x/oak/mod.ts
Download https://deno.land/x/oak/application.ts
Download https://deno.land/x/oak/context.ts
[...]
Download https://deno.land/x/oak/pathToRegExp.ts
Listening on http://localhost:8000/
error: Uncaught PermissionDenied: run again with the --allow-net flag
► $deno$/dispatch_json.ts:40:11
    at DenoError ($deno$/errors.ts:20:5)
    at unwrapResponse ($deno$/dispatch_json.ts:40:11)
    at sendSync ($deno$/dispatch_json.ts:67:10)
    at listen ($deno$/net.ts:179:15)
    at serve (server.ts:487:20)
    at listen (application.ts:33:25)
    at example4.ts:11:5
```

---

# Uruchomienie serwera

```bash
$ deno run --allow-net example4.ts 
```
```text
Listening on http://localhost:8000/
```

---

# Dynamic imports<br>top level await

```ts
const { hello } = await import('https://pocztarski.com/hello.ts');

hello();
```

---

# Brak uprawnień kiedyś

```bash
$ deno run hi2.ts
```
```text
Compile file:///Users/rsp/talks/deno/git/wid/hi2.ts
Download https://pocztarski.com/hello.ts
️⚠️  Deno requests network access to "https://pocztarski.com/hello.ts". Grant?
[a/y/n/d (a = allow always, y = allow once, n = deny once, d = deny always)] y
Hello, world!
```

---

# Brak uprawnień teraz

```bash
$ deno run hi2.ts
```
```text
Compile file:///Users/rsp/talks/git/ondd/hi2.ts
error: Uncaught TypeError: run again with the --allow-net flag
```

---

# Uruchomienie z uprawnieniami

```bash
$ deno run --allow-net=pocztarski.com hi2.ts
```
```text
Hello, world!
```

---

# Pliki

Do 18.01.2020 - całość w przykładzie serve.ts
```ts
for await (const req of server) {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'GET') {
    try {
      req.respond({ body: await Deno.readFile(`.${req.url}`) });
    } catch (e) {
      console.log(e);
      req.respond({ status: 404, body: encoder.encode('Not Found') });
    }
  } else {
    req.respond({ status: 405, body: encoder.encode('Method Not Allowed') });
  }
}
```

---

# Pliki

Od 18.01.2020 - całość w przykładzie serve2.ts
```ts
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
```

---

# TextEncoder

[deno.land/x/ende](https://deno.land/x/ende/)
useless since Deno 0.30

```ts
// Copyright (c) 2019 Rafał Pocztarski. All rights reserved.
// MIT License (Expat). See: https://github.com/rsp/deno-ende

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const en = (x: string) => encoder.encode(x);
export const de = (x: Uint8Array) => decoder.decode(x);

export const enc = en;
export const dec = de;

export const encode = en;
export const decode = de;
```

---

# Uruchamianie serwera

Kiedyś:

```bash
$ deno run --allow-net=:8000 --allow-read=./dir --no-prompt serve.ts 
```

Teraz:

```bash
$ deno run --allow-net=:8000 --allow-read=`pwd`/dir serve.ts 
```

---

# WebAssembly

```bash
$ cat factorial.c
```

```c
int factorial(int n) {
  return n < 1 ? 1 : n * factorial(n - 1);
}
```

Emscripten: https://emscripten.org/

WasmFiddle: https://wasdk.github.io/WasmFiddle/

WebAssembly Studio: https://webassembly.studio/

---

# WebAssembly<br>w Deno

```ts
const mod = new WebAssembly.Module(await Deno.readFile('program.wasm'));

const { exports: { factorial } } = new WebAssembly.Instance(mod);

console.log(factorial(10));
```

---

# Deno z WebAssembly

Kiedyś:

```bash
$ deno run --allow-read=program.wasm wasm.ts 
3628800
```

Teraz:

```bash
$ deno run --allow-read=`pwd`/program.wasm wasm.ts
3628800
```

---

Języki kompilowane do WebAssembly

.Net,
AssemblyScript,
Astro,
Brainfuck,
C,
C#,
C++,
Clean,
D,
Elixir,
F#,
Faust,
Forest,
Forth,
Go,
Grain,
Haskell,
Java,
JavaScript,
Julia,
Idris,
Kotlin/Native,
Kou,
Lua,
Lys,
Nim,
Ocaml,
Perl,
PHP,
Plorth,
Poetry,
Python,
Prolog,
Ruby,
Rust,
Scheme,
Scopes,
Speedy.js,
Swift,
Turboscript,
TypeScript,
Wah,
Walt,
Wam,
Wracket,
Xlang,
Zig

https://github.com/appcypher/awesome-wasm-langs

---

# Biblioteki

Wbudowane API: https://deno.land/typedoc/

Standard Modules: https://deno.land/std/

Third Party Modules: https://deno.land/x/

---

# Zalety

1. Łatwa instalacja
2. Łatwy development
3. Domyślnie bezpieczne
4. Precyzyjne przywileje
5. Wbudowany TypeScript
6. Nowoczesna składnia
7. Webowe standardy
8. API oparte na async/await

---

# Podsumowanie

Deno to runtime dla JavaScript/TypeScript<br>
Cały runtime to pojedynczy plik<br>
Sam runtime nie ma zależności<br>
Importuje i wykonuje URLe<br>
Wspiera dynamiczne importy<br>
Wspiera top-level await<br>
Dostarcza ograniczony sandbox

---

# Dziękuję!

Slajdy: https://pocztarski.com/ondd

## Rafał Pocztarski<br>[pocztarski.com](https://pocztarski.com)

<!-- [<img src="https://acclaim-production-app.s3.amazonaws.com/images/80a4f224-f7f9-4c44-928d-540b158b8902/node-js%2BContributor.png" height="80">][youracclaim-url] -->
[<img height="60" src="https://stackexchange.com/users/flair/303952.png">][stackexchange-url]
[<img height="60" src="https://img.shields.io/github/followers/rsp.svg?style=social&label=Follow">][github-follow-url]
[<img height="60" src="https://img.shields.io/twitter/follow/pocztarski.svg?style=social&label=Follow">][twitter-follow-url]
<br>
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/twitter.svg">][twitter-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/medium.svg">][medium-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/facebook.svg">][facebook-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/googleplus.svg">][googleplus-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/linkedin.svg">][linkedin-url]
[<svg height="60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.9 31.4"><path d="M18.3 13.4c1.3.2 2.2.8 2.7 1.6s.8 2.2.8 4c0 3.6-1.1 6.6-3.3 8.9-2.2 2.3-5 3.5-8.4 3.5-1.3 0-2.6-.2-3.9-.7-1.3-.5-2.3-1.2-3.2-2-1-.9-1.8-2-2.3-3-.4-1.1-.7-2.2-.7-3.3 0-1.2.3-2.2.8-2.9.5-.7 1.4-1.1 2.5-1.4-.2-.5-.4-.9-.5-1.3-.1-.3-.2-.6-.2-.8 0-.6.3-1.3 1-2s1.3-1 1.9-1c.3 0 .5 0 .8.1.3.1.6.2 1 .5-.9-3-1.8-5.5-2.3-7.2-.5-1.7-.7-2.8-.7-3.5 0-.9.2-1.6.7-2.1C5.4.3 6.1 0 6.9 0c1.3 0 3 3 5.1 9.1.4 1 .6 1.8.8 2.4.2-.4.4-1.1.7-1.9 2.1-6 3.9-9 5.3-9 .7 0 1.3.2 1.8.7.4.5.7 1.2.7 2 0 .6-.2 1.8-.7 3.5-.6 1.7-1.3 3.9-2.3 6.6zM2.9 22.2c.2.2.5.6.8 1.1.9 1.3 1.8 2 2.6 2 .3 0 .5-.1.7-.3.2-.2.3-.4.3-.5 0-.2-.1-.6-.4-1.1-.3-.5-.7-1.1-1.2-1.7-.6-.7-1.1-1.3-1.4-1.6-.4-.3-.7-.5-.9-.5-.5 0-1 .3-1.4.8-.4.5-.6 1.2-.6 1.9 0 .6.1 1.2.4 2 .3.7.7 1.5 1.3 2.2.9 1 1.9 1.9 3.2 2.5 1.3.6 2.6.9 4.2.9 2.8 0 5.1-1 7-3.1 1.9-2.1 2.8-4.7 2.8-7.9 0-1-.1-1.7-.2-2.3-.1-.6-.4-1-.7-1.2-.6-.5-1.7-.9-3.4-1.3s-3.5-.6-5.3-.6c-.5 0-.9.1-1.1.3-.2.2-.3.5-.3.9 0 1 .5 1.7 1.6 2.1 1.1.4 2.9.7 5.3.7h.9c.2 0 .4.1.5.2.1.2.2.4.2.7-.2.2-.7.5-1.5.8-.8.3-1.3.6-1.7.9-.9.6-1.6 1.4-2.1 2.3-.5.9-.8 1.7-.8 2.5 0 .5.1 1 .3 1.7.2.7.3 1.1.3 1.2v.4c-.6 0-1.1-.4-1.5-1.1-.4-.7-.5-1.6-.5-2.8v-.2c-.1.1-.2.2-.3.2-.1 0-.2.1-.4.1h-.4c-.1 0-.2-.1-.4-.1 0 .2.1.3.1.5v.4c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.5.6-.9 0-1.8-.4-2.8-1.3-.9-.9-1.4-1.7-1.4-2.6 0-.2 0-.3.1-.4 0-.5.1-.6.2-.7zm6.5.5c.2 0 .5-.1.7-.3.2-.2.3-.5.3-.7 0-.3-.2-.9-.6-1.9-.4-1-.9-2-1.5-2.9-.4-.7-.9-1.3-1.3-1.6-.4-.4-.8-.5-1.2-.5-.3 0-.6.2-1 .6-.4.4-.5.7-.5 1.1 0 .3.2.9.5 1.6.4.7.8 1.4 1.4 2.2.6.8 1.2 1.5 1.8 2 .6.2 1 .4 1.4.4zm2.1-10.4L9.1 5.6c-.6-1.7-1-2.9-1.4-3.4-.3-.5-.6-.8-1-.8-.3 0-.5.1-.7.3-.3.3-.4.6-.4 1 0 .7.3 1.8.8 3.4.5 1.6 1.3 3.8 2.3 6.4.1-.2.2-.3.4-.3.2-.1.4-.1.6-.1h.5c.3.1.7.1 1.3.2zm2.4 6.5c-.6 0-1.2-.1-1.8-.2-.6-.1-1.1-.2-1.6-.4.2.5.4.9.6 1.4.2.5.3.9.4 1.4.3-.4.7-.8 1.1-1.2.5-.4.9-.7 1.3-1zm2.9-5.8c1-2.6 1.7-4.8 2.3-6.5.5-1.7.8-2.7.8-3.1 0-.4-.1-.7-.3-1-.2-.2-.4-.3-.7-.3-.4 0-.8.3-1.2 1-.4.7-.9 1.7-1.4 3.2l-2.2 6.2 2.7.5z"></path></svg>][angellist-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/instagram.svg">][instagram-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/flickr.svg">][flickr-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/codepen.svg">][codepen-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/github.svg">][github-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/stackexchange.svg">][stackexchange-url]
[<img height="60" src="https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/stackoverflow.svg">][stackoverflow-url]

[github-follow-url]: https://github.com/rsp
[github-follow-img]: https://img.shields.io/github/followers/rsp.svg?style=social&label=Follow
[twitter-follow-url]: https://twitter.com/intent/follow?screen_name=pocztarski
[twitter-follow-img]: https://img.shields.io/twitter/follow/pocztarski.svg?style=social&label=Follow
[stackoverflow-url]: https://stackoverflow.com/users/613198/rsp
[stackexchange-url]: https://stackexchange.com/users/303952/rsp
[stackexchange-img]: https://stackexchange.com/users/flair/303952.png
[linkedin-url]: https://www.linkedin.com/in/pocztarski)
[facebook-url]: https://www.facebook.com/pocztarski
[twitter-url]: https://twitter.com/pocztarski
[github-url]: https://github.com/rsp
[medium-url]: https://medium.com/pocztarski
[flickr-url]: https://www.flickr.com/photos/pocztarski/
[instagram-url]: https://www.instagram.com/pocztarski/
[googleplus-url]: https://plus.google.com/106457556668508404492/about
[npm-url]: https://www.npmjs.com/~rsp
[youracclaim-url]: https://www.youracclaim.com/user/pocztarski
[angellist-url]: https://angel.co/pocztarski
[codepen-url]: https://codepen.io/rsp/
