import { Tinctures } from "./tinctures.mjs";
import {Objects} from "./objects.mjs";
import { colors, furs, ordinaries, treatments, divisions, charges, numbers , orientation} from "./tokens.mjs";

export class BlazonParser {
    #input = "";
    #index = 0;

    parse(input) {
        // step 1: fold accents and lowercase
        const blazon = input.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
        this.#input = blazon;
        const field = this.matchField();
        // now we look for zero or more objects
        const objects = []
        while (this.#index < this.#input.length)
        {
            const o = this.matchObject();
            if(o != null)
                objects.push(o);
            else break;
        }
        return {field: field, objects: objects};
    }

    matchField() {
        const d = this.matchDivision();
        if(d != null) {
            return {division: d};
        }
        const m = this.matchTincture();
        if(m === null) return null;
        return {tincture: m};
    }

    matchTincture() {
        const treament = this.#matchTreatment();
        if(treament != null)
        {
            // we need to check for color or fur
            const a = this.matchColorOrFur();
            if(a != null)
            {
                //  treatment C (if treatment takes only one color)
                treament.first = a;
                this.skipAND();
                // possibly twice
                const b = this.matchColorOrFur();
                //  treatment C C
                if (b != null) {
                    treament.second = b;
                }
            }
            return treament;
        }

        const base = this.matchColorOrFur();
        if(base != null) {
            const treament = this.#matchTreatment();
            if(treament != null)
            {
                //  C treatment (if treatment takes only one color)
                treament.first = base;
                // possibly twice
                const b = this.matchColorOrFur();
                //  C treatment C
                if (b != null) {
                    treament.second = b;
                }
                return treament;
            }
        }

        return base;
    }

    matchDivision() {
        const d = this.matchCategory(divisions);
        if(d === null) return null;
        const division = {type: Objects.DIVISION, name: d, tinctures: []};
        // may have an orientation (ie, dexter, sinister)
        const o = this.matchCategory(orientation);
        if(o) division.orientation = o;
        // may have a line type or other modifications
        // TODO
        // a division will have at least 2 tinctures
        let t1 = this.matchTincture();
        while (t1 != null) {
            division.tinctures.push(t1);
            this.skipAND();
            t1 = this.matchTincture();
        }

        return division;
    }

    #matchTreatment() {
        const m = this.matchCategory(treatments);
        if(m === null) return null;
        return {type: Tinctures.TREATMENT, name: m};
    }

    matchColorOrFur()
    {
        return this.#matchColor() || this.#matchFur();
    }

    #matchFur() {
        const m = this.matchCategory(furs);
        if(m === null) return null;
        return {type: Tinctures.FUR, name: m};
    }

    #matchColor() {
        const m = this.matchCategory(colors);
        if(m === null) return null;
        return {type: Tinctures.COLOR, name: m};
    }

    matchObject() {
        return this.matchOrdinary() || this.matchCharge();
    }

    matchOrdinary() {
        // might have a number
        const n = this.matchCategory(numbers);
        // TODO: might have a prefix
        const m = this.matchCategory(ordinaries);
        if(m === null) return null;
        const ord = {type: Objects.ORDINARY, name: m, number: n};
        // might have some modifiers
        // ie, voided, cotticed, line variation
        // should have a tincture
        const t = this.matchTincture();
        if (t != null)
            ord.tincture = t;
        return ord;
    }

    matchCharge() {
        // might have an arrangement/position
        // number if any
        const n = this.matchCategory(numbers);
        // prefix if any
        // actual charge
        const m = this.matchCategory(charges);
        if(m === null) return null;
        const charge = {type: Objects.CHARGE, name: m, number: n ?? 1};
        // might be arrangement/position following charge name
        // tincture
        const t = this.matchTincture();
        if (t != null)
            charge.tincture = t;
        //may be associated charges
        return charge;
    }

    skipAND() {
        const r = /(and|&|also)\s+/y;
        r.lastIndex = this.#index;
        if(r.exec(this.#input))
        {
            this.#index = r.lastIndex;
        }
    }

    skipWS() {
        const r = /\s+/y;
        r.lastIndex = this.#index;
        if(r.exec(this.#input))
        {
            this.#index = r.lastIndex;
        }
    }

    // this is the core of our parsing approach
    // find the longest regex match in this category
    // using the 'sticky' modifier to only advance on a match
    matchCategory(category) {
        let longest = this.#index;
        let matched_value = null;
        for (const m of category) {
            // TODO: premodify the regex outside the loop (or at least cache)
            const r = new RegExp(`${m.regex.source}\\b`, "y");
            r.lastIndex = this.#index;

            if(r.exec(this.#input))
            {
                if(r.lastIndex > longest)
                {
                    longest = r.lastIndex;
                    matched_value = m.val;
                }
            }
        }
        this.#index = longest;
        if(matched_value != null) this.skipWS();
        return matched_value;
    }
}
