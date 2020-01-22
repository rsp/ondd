const mod = new WebAssembly.Module(await Deno.readFile('program.wasm'));
const { exports: { factorial } } = new WebAssembly.Instance(mod);
console.log(factorial(10));

