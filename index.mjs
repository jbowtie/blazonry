import { ShieldBuilder } from "./builder.mjs";
import { BlazonParser } from "./parser.mjs";

const Category = {
    ORDINARY: 0,
    DIVISION: 1,
    CHARGE: 2
};

//const input = "gules bend azure";
const input = "ermine";

const parser = new BlazonParser();
const instructions = parser.parse(input);

// step 3: draw the shield
const shield = new ShieldBuilder();
const svg = shield.draw(instructions);

process.stdout.write(svg);
