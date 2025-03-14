import { ShieldBuilder } from "./builder.mjs";
import { BlazonParser } from "./parser.mjs";

// This is a very simple example program
// It lets you pipe in a bazon and outputs the SVG
//   echo "azure bend ermine" | node index.mjs > example.svg

// pipe in some input
let input = "";
for await (const chunk of process.stdin) input += chunk;

// parse the input
const parser = new BlazonParser();
const instructions = parser.parse(input);

// draw the shield
const shield = new ShieldBuilder();
const svg = await shield.draw(instructions);

// write out the SVG
process.stdout.write(svg);
