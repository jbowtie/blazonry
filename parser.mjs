import { Tinctures } from "./tinctures.mjs";
import {Objects} from "./objects.mjs";
import { colors, furs, ordinaries, treatments } from "./tokens.mjs";

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
            const o = this.matchOrdinary();
            if(o != null)
                objects.push(o);
            else break;
        }
        return {field: field, objects: objects};
    }

    matchField() {
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
        return this.matchOrdinary();
    }

    matchOrdinary() {
        // might have a number
        // might have a prefix
        const m = this.matchCategory(ordinaries);
        if(m === null) return null;
        const ord = {type: Objects.ORDINARY, name: m};
        // might have some modifiers
        // should have a tincture
        const t = this.matchTincture();
        if (t != null)
            ord.tincture = t;
        return ord;
    }

    skipWS() {
        const r = /\s+/y;
        r.lastIndex = this.#index;
        if(r.exec(this.#input))
        {
            this.#index = r.lastIndex;
        }
    }

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
