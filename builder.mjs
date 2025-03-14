import { Tinctures, ColorMap, FurMap, TreatmentMap } from "./tinctures.mjs";
import { Charges, Divisions, Objects, Ordinaries } from "./objects.mjs";
// shield shapes
const heater = "m 0,0 v 800 c -2.5063876,43.11115 1.2341419,84.33503 21.489586,125.13639 20.255443,40.80137 53.477613,79.98631 98.039434,115.63581 44.56181,35.6494 100.44867,67.7517 164.92346,94.7345 64.47479,26.9828 137.51639,48.8374 215.54752,64.4933 78.03113,-15.6559 151.07273,-37.5105 215.54752,-64.4933 64.47479,-26.9828 120.36165,-59.0851 164.92346,-94.7345 44.56182,-35.6495 77.78399,-74.83444 98.03943,-115.63581 C 998.76586,884.33503 1000.1453,841.93063 1000,800 V 0 Z";

// Converts a set of instructions produced by the parser into SVG
export class ShieldBuilder {
    #defs = new Map();
    #instructions = null;

    handleField(field) {
        // may need to be adjusted for other shield shapes
        const area = this.#instructions.area;
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
        // standard path is 'dexter'
        let path = ord.path;
        // if we support sinister, use that path instead
        if(ordinary.orientation == 'sinister') {
            if (ord.sinister)
                path = ord.sinister;
        }
        const x = this.applyTincture(ordinary.tincture, path);
        return `<g>${x}</g>`
    }

    // async loadChargeDef(key, chargeDef) {
    //     // read in the XML
    //     const data = await fetch(chargeDef.file).then(r => r.text());
    //     // get the width and height
    //     // TODO: get any license metadata
    //     var parser = new DOMParser();
    //     var doc = parser.parseFromString(data, "image/svg+xml");
    //     const w = doc.documentElement.width.baseVal.value;
    //     const h = doc.documentElement.height.baseVal.value;
    //     this.#defs.set(key, definition);
    // }
    async handleCharge(charge) {
        // may need to calculate a key from name + modifiers
        //const key = charge.name;
        const chargeDef = Charges[charge.name];
        const data = await fetch(chargeDef.file).then(r => r.text());
        // TODO: may want to scale a treatment or fur
        const tinted = this.applyTincture(charge.tincture, data);
        // TODO: calculate the transform based on position and scale
        // numbers here use the whole shield for the bounding box and a standard center point
        const t = this.calculateChargePosition(data, {x:500, y:600}, {x: 1000*0.8, y: 1200*0.8})
// WOLF: translate(100,401.86914612447) scale(2.2594066583472, 2.7112879900166) 
        return `<g transform='translate(${t.posX},${t.posY}) scale(${t.scaleX}, ${t.scaleY})'>${tinted}</g>`;
    }

    calculateChargePosition(charge, position, bounds) {
        // position is where we want to place the charge
        var parser = new DOMParser();
        var doc = parser.parseFromString(charge, "image/svg+xml");
        const w = doc.documentElement.width.baseVal.value;
        const h = doc.documentElement.height.baseVal.value;
        const scale = {x: bounds.x / w, y: bounds.y / h};
        scale.x = scale.y = Math.min (scale.x, scale.y);
        const resized = {w: w * scale.x, h: h * scale.y};
        const midpoint = {x: resized.w / 2, y: resized.h / 2};
        const pos = {x: position.x - midpoint.x, y: position.y - midpoint.y};
        return {posX: pos.x, posY: pos.y, scaleX: scale.x, scaleY: scale.y};
    }

    async handleObject(o) {
        switch (o.type) {
            case Objects.ORDINARY:
                return this.handleOrdinary(o);
            case Objects.CHARGE:
                return await this.handleCharge(o);
            default:
                console.warn(`Don't recognize object type ${o.type}`);
                return "";
        }
    }

    applyTincture (tincture, target) {
        switch (tincture.type) {
            case Tinctures.COUNTER:
                const field = this.#instructions.field;
                // create a mask from the target
                const mask_key = `counter-${this.#defs.size}`;
                this.#defs.set(mask_key, `<mask id="${mask_key}"><g fill="#fff">${target}</g></mask>`)
                if(field.division) {
                    // recreate the division, but swap the colors
                    const layer = this.applyDivision(field.division, this.#instructions.area, true);
                    return `<g mask="url(#${mask_key})">${layer}</g>`;
                }
                if(field.tincture.type == Tinctures.TREATMENT) {
                    // get or create the counter treatment
                    const counterTreatment = `${field.tincture.name}-counter`;
                    if(!this.#defs.has(counterTreatment)) {
                        const pattern = this.#makeTreatmentPattern(field.tincture, counterTreatment, true);
                        this.#defs.set(counterTreatment, pattern);
                    }
                    return `<g mask="url(#${mask_key})"><g fill="url(#${counterTreatment})">${this.#instructions.area}</g></g>`;
                }
                if(field.tincture.type == Tinctures.FUR) {
                    // get or create the counter fur
                    const counterFur = `${field.tincture.name}-counter`;
                    if(!this.#defs.has(counterFur)) {
                        const pattern = this.#makeFurPattern(field.tincture, counterFur, true);
                        this.#defs.set(counterFur, pattern);
                    }
                    return `<g mask="url(#${mask_key})"><g fill="url(#${counterFur})">${this.#instructions.area}</g></g>`;
                }
                console.error("Cannot apply counterchange");
                return `<g fill="${ColorMap.error}">${target}</g>`;

            case Tinctures.TREATMENT:
                let treatKey = tincture.name;
                if(!this.#defs.has(treatKey)) {
                    const pattern = this.#makeTreatmentPattern(tincture, treatKey);
                    this.#defs.set(treatKey, pattern);
                }
                return `<g fill="url(#${treatKey})">${target}</g>`;

            case Tinctures.FUR:
                let key = tincture.name;
                if(!this.#defs.has(key)) {
                    const pattern = this.#makeFurPattern(tincture, key);
                    this.#defs.set(key, pattern);
                }
                return `<g fill="url(#${key})">${target}</g>`;

            case Tinctures.COLOR:
            default:
                const color = ColorMap[tincture.name];
                return `<g  fill="${color}">${target}</g>`;
        }
    }

    #makeTreatmentPattern(tincture, treatKey, swap_colours = false) {
        const treatment = TreatmentMap[tincture.name];
        const pattern_body = treatment.pattern;
        // base rectangle + colored treatment
        const area = `<rect x='0' y='0' width='${treatment.width}' height='${treatment.height}' />`
        const base = this.applyTincture(swap_colours ? tincture.second : tincture.first, area);
        const overlay = this.applyTincture(swap_colours ? tincture.first : tincture.second, pattern_body);
        // TODO: calculate offset to make treatment symmetrical
        const offset = treatment.offset ?? 0;
        const pattern = `<pattern id="${treatKey}" x="${offset}" y="0" width="${treatment.width}" height="${treatment.height}" patternContentUnits="userSpaceOnUse" patternUnits="userSpaceOnUse">
        <g class="treatment">${base}<g stroke-width="2" stroke="none">${overlay}</g></g>
        </pattern>`
        return pattern;
    }

    #makeFurPattern(tincture, key, swap_colours = false) {
        const fur = FurMap[tincture.name];
        let pattern_body = fur.pattern.replaceAll("%FOREGROUND%", fur.foreground).replaceAll("%BACKGROUND%", fur.background);
        if(swap_colours) {
            pattern_body = fur.pattern.replaceAll("%FOREGROUND%", fur.background).replaceAll("%BACKGROUND%", fur.foreground);
        }
        // TODO: invert if needed
        const pattern = `<pattern id="${key}" width="${fur.width}" height="${fur.height}" x="0" y="0" patternContentUnits="userSpaceOnUse" patternUnits="userSpaceOnUse">
            <g class="fur">${pattern_body}</g>
        </pattern>`
        return pattern;
    }

    applyDivision(division, target, swap_colours = false) {
        const def = Divisions[division.name];
        // standard path is 'dexter'
        let path = def.path;
        // if we support sinister, use that path instead
        if(division.orientation == 'sinister') {
            if (def.sinister)
                path = def.sinister;
        }
        // TODO: handle countercharge
        // a countercharged division cannot be the field itself
        // but can be overlaid on the field effectively like an ordinary

        // normally the tinctures are used as ordered
        let tinctures = division.tinctures;
        // if we're being used as a mask we might need to swap the colours
        if (swap_colours) {
            const old_first = tinctures.shift();
            tinctures.push(old_first);
        }
        // first area is always the base
        const div1 = this.applyTincture(tinctures[0], target)
        // TODO: handle more than two areas
        const div2 = this.applyTincture(tinctures[1], path)
        return `<g stroke-width="4" stroke="none">${div1}${div2}</g>`
    }


    async draw(instructions) {
        // reset internal state
        this.#defs = new Map();
        // allows us to resolve references
        this.#instructions = instructions;
        // mask for shield shape
        const mask = `<mask id="heater-shield"><path fill="#FFFF" d="${heater}"/></mask>`
        instructions.area = `<rect x='0' y='0' width='1000' height='1200'><title>Field</title></rect>`
        // construct the field
        let body = this.handleField(instructions.field);
        // process ordinaries and charges
        for (const o of instructions.objects) {
            body += await this.handleObject(o);
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