import { ShieldBuilder } from "./builder.mjs";
import { BlazonParser } from "./parser.mjs";


const input = "rose gingham az bend ermine";

const parser = new BlazonParser();
const instructions = parser.parse(input);

const shield = new ShieldBuilder();
const svg = await shield.draw(instructions);

process.stdout.write(svg);
