import { Tinctures } from "./tinctures.mjs";

export class BlazonParser {
    #tokens = [];
    #input = "";
    #index = 0;

    parse(input) {
        // step 1: fold accents and lowercase
        const blazon = input.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
        this.#input = blazon;
        this.#tokens = blazon.split(' ');
        const field = this.matchField();
        return {field: field};
    }

    matchField() {
        const m = this.matchTincture();
        if(m === null) return null;
        return {tincture: m};
    }

    matchTincture() {
        // TODO treatments
        //  C = color or fur
        // can be:
        //  treatment C C
        //  treatment C (if treatment takes only one color)
        //  C treatment (if treatment takes only one color)
        //  C treatment C
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
        return matched_value;
    }
}

const colors = [
    {regex: /az(ure)?/, val: "azure"},
    {regex: /or/, val: "or"},
    {regex: /d or/, val: "or"},
    {regex: /orange/, val: "orange"},
    {regex: /vert|sinople/, val: "vert"},
    {regex: /gui?(les)?/, val: "gules"},
    {regex: /arg(ent)?/, val: "argent"},
    {regex: /sa(ble)?/, val: "sable"},
    {regex: /purp(le|ure)/, val: "purpure"},
    {regex: /murrey/, val: "murrey"},
    {regex: /sanguine/, val: "sanguine"},
    {regex: /carnation/, val: "carnation"},
    {regex: /brunatre/, val: "brunatre"},
    {regex: /rose/, val: "rose"},
    {regex: /buff/, val: "buff"},
]

const furs = [
    {regex: /ermine/, val: "ermine"},
]

// shield = quartered | halved | simple
// simple = tincture object*
// tincture = color | fur | treatment
// object = ordinary | charge
