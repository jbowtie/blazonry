import { Tinctures, ColorMap, FurMap, TreatmentMap } from "./tinctures.mjs";
import { Divisions, Ordinaries } from "./objects.mjs";
// shield shapes
const heater = "m 0,0 v 800 c -2.5063876,43.11115 1.2341419,84.33503 21.489586,125.13639 20.255443,40.80137 53.477613,79.98631 98.039434,115.63581 44.56181,35.6494 100.44867,67.7517 164.92346,94.7345 64.47479,26.9828 137.51639,48.8374 215.54752,64.4933 78.03113,-15.6559 151.07273,-37.5105 215.54752,-64.4933 64.47479,-26.9828 120.36165,-59.0851 164.92346,-94.7345 44.56182,-35.6495 77.78399,-74.83444 98.03943,-115.63581 C 998.76586,884.33503 1000.1453,841.93063 1000,800 V 0 Z";

// Converts a set of instructions produced by the parser into SVG
export class ShieldBuilder {
    #defs = new Map();

    handleField(field) {
        // may need to be adjusted for other shield shapes
        const area = `<rect x='0' y='0' width='1000' height='1200'><title>Field</title></rect>`
        // handle a division
        if (field.division) {
            return this.applyDivision(field.division, area);
        }
        // no division? handle the tincture
        if (field.tincture) {
            return this.applyTincture(field.tincture, area);
        }
        return area;
    }

    handleOrdinary(ordinary) {
        const ord = Ordinaries[ordinary.name];
        const x = this.applyTincture(ordinary.tincture, ord.path);
        return `<g>${x}</g>`
    }

    applyTincture (tincture, target) {
        switch (tincture.type) {
            case Tinctures.TREATMENT:
                let treatKey = tincture.name;
                if(!this.#defs.has(treatKey)) {
                    const treatment = TreatmentMap[tincture.name];
                    const pattern_body = treatment.pattern;
                    // base rectangle + colored treatment
                    const area = `<rect x='0' y='0' width='${treatment.width}' height='${treatment.height}' />`
                    const base = this.applyTincture(tincture.first, area);
                    const overlay = this.applyTincture(tincture.second, pattern_body);
                    // TODO: calculate offset to make treatment symmetrical
                    const offset = treatment.offset ?? 0;
                    const pattern = `<pattern id="${treatKey}" x="${offset}" y="0" width="${treatment.width}" height="${treatment.height}" patternContentUnits="userSpaceOnUse" patternUnits="userSpaceOnUse">
                    <g class="treatment">${base}<g stroke-width="2" stroke="none">${overlay}</g></g>
                    </pattern>`
                    this.#defs.set(treatKey, pattern);
                }
                return `<g fill="url(#${treatKey})">${target}</g>`;

            case Tinctures.FUR:
                // in future want to construct from variable parts
                // so 'ermine' is distinct from 'ermine-inverted-countercharged'
                let key = tincture.name;
                if(!this.#defs.has(key)) {
                    const fur = FurMap[tincture.name];
                    // TODO: swap if countercharged
                    const pattern_body = fur.pattern.replaceAll("%FOREGROUND%", fur.foreground).replaceAll("%BACKGROUND%", fur.background);
                    // TODO: invert if needed
                    const pattern = `<pattern id="${key}" width="${fur.width}" height="${fur.height}" x="0" y="0" patternContentUnits="userSpaceOnUse" patternUnits="userSpaceOnUse">
                        <g class="fur">${pattern_body}</g>
                    </pattern>`
                    this.#defs.set(key, pattern);
                }
                return `<g fill="url(#${key})">${target}</g>`;

            case Tinctures.COLOR:
            default:
                const color = ColorMap[tincture.name];
                return `<g  fill="${color}">${target}</g>`;
        }
    }

    applyDivision(division, target) {
        const def = Divisions[division.name];
        // TODO: handle countercharge
        // first area is always the base
        const div1 = this.applyTincture(division.tinctures[0], target)
        // TODO: handle more than two areas
        const div2 = this.applyTincture(division.tinctures[1], def.path)
        return `<g stroke-width="4" stroke="none">${div1}${div2}</g>`
    }


    draw(instructions) {
        // mask for shield shape
        const mask = `<mask id="heater-shield"><path fill="#FFFF" d="${heater}"/></mask>`
        // construct the field
        let body = this.handleField(instructions.field);
        // process ordinaries and charges
        for (const o of instructions.objects) {
            body += this.handleOrdinary(o);
        }
        // prepare any defs that accumulated
        const defs = [...this.#defs.values()].join("")
        return `<?xml version="1.0" encoding="utf-8" ?>
        <svg version="1.1"
            baseProfile="full"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/" 
            preserveAspectRatio="xMidYMid meet"
            viewBox="0,0,1000,1200">
            <defs>${mask}${defs}</defs>
            <g mask="url(#heater-shield)">
                ${body}
            </g>
        </svg>`;
    }
}