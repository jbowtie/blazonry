export const Tinctures = {
    COLOR: 0,
    FUR: 1,
    TREATMENT: 2
};

// map color names to sRGB values
export const ColorMap = {
    // standard colors
    or: "#EFD807",
    azure: "#1E7FCB",
    vert: "#149414",
    gules: "#E21313",
    argent: "#F0F0F0",
    sable: "#050505",
    purpure: "#965578",
    // common colors
    murrey: "#8C004B",
    sanguine: "#850606",
    carnation: "#FEC3AC",
    brunatre: "#7E0001",
    cendree: "#848484",
    rose: "#FF006E",
    bis: "#F1E2BE",
    celestial_azure: "#96C8F9",
    senois: "#8D4024",
    tenne: "#A75502",
    orange: "#FAA401",
    //other authorities
    buff: "#F0DC82",
    red_ochre: "#890520",
    yellow_ochre: "#CCAA2B",
    crimson: "#DC143C",
    // metals supported by DrawShield
    iron: "#BCBCBC",
    bronze: "#C28039",
    copper: "#BA702F",
    lead: "#6B949E",
    steel: "#BDBDBD",
    // error color
    grey: "#888888",
    // extras
    white: "#FFFFFF",
    // for SVG purposes we'll map this to white
    // doesn't support RGBA so we'll need to special case
    // and set opacity to 0
    transparent: "#FFFFFF",
}

// many furs are just color variants of the basic ermine pattern
const erminePattern = `<polygon points="0,0 222,0 222,400 0,400" fill="%BACKGROUND%"/>
        <g stroke-width="2" stroke="none" fill="%FOREGROUND%">
            <circle r="10" cx="55" cy="30"/>
            <circle r="10" cx="36" cy="55"/>
            <circle r="10" cx="74" cy="55"/>
            <path d="M 53 60 A 50 210 0 0,1 10,180 A 60 40 0 0,0 45,170 A 30 40 0, 0,0 55 200 A 30 40 0, 0,0 62,170 A 60 40 0 0,0 101, 180 A 50 210 0 0,1 57 60 Z"/>
        </g>
        <g stroke-width="2" stroke="none" transform="translate(111,200)" fill="%FOREGROUND%">
            <circle r="10" cx="55" cy="30"/>
            <circle r="10" cx="36" cy="55"/>
            <circle r="10" cx="74" cy="55"/>
            <path d="M 53 60 A 50 210 0 0,1 10,180 A 60 40 0 0,0 45,170 A 30 40 0, 0,0 55 200 A 30 40 0, 0,0 62,170 A 60 40 0 0,0 101, 180 A 50 210 0 0,1 57 60 Z"/>
        </g>
        `

export const FurMap = {
    ermine: {
        width: 222,
        height: 400,
        background: ColorMap.argent,
        foreground: ColorMap.sable,
        pattern: erminePattern
    },
    counter_ermine: {
        width: 222,
        height: 400,
        background: ColorMap.sable,
        foreground: ColorMap.argent,
        pattern: erminePattern
    },
    erminois: {
        width: 222,
        height: 400,
        background: ColorMap.or,
        foreground: ColorMap.sable,
        pattern: erminePattern
    },
    pean: {
        width: 222,
        height: 400,
        background: ColorMap.sable,
        foreground: ColorMap.or,
        pattern: erminePattern
    },
    vair: {
        width: 250,
        height: 480,
        background: ColorMap.argent,
        foreground: ColorMap.azure,
        pattern: `<polygon stroke-width="2" " points="0,0 0,480 250,480 250,0" fill="%BACKGROUND%"/>
        <polygon stroke-width="2" points="125,0 193,40 193,200 250,240 0,240 66,200 66,40" fill="%FOREGROUND%"/>
        <polygon stroke-width="2" transform="translate(125,240)" points="125,0 193,40 193,200 250,240 0,240 66,200 66,40" fill="%FOREGROUND%"/>
        <polygon stroke-width="2" transform="translate(-125,240)" points="125,0 193,40 193,200 250,240 0,240 66,200 66,40" fill="%FOREGROUND%"/>
        `
    }
}

// TODO: mark treaments that only take one color
// * bezanty
// * hurty
// * platy
// * guzy
// * pommy
// * torty
export const TreatmentMap = {
    gingham: {
        width: 200,
        height: 200,
        offset: 50,
        pattern: `
        <g class="treatment">
            <path d="M 0,0 H 100 V 100 H 0 Z" />
            <path style="opacity:0.5" d="M 100,0 H 200 V 100 H 100 Z" />
            <path style="opacity:0.5" d="M 0,100 H 100 V 200 H 0 Z" />
        </g>`
    },
    checky: {
        width:333.32999,
        height:333.32999,
        pattern: `
        <g class="treatment">
            <path d="M 0,166.665 H 166.665 V 0 H 0 Z M 166.665,333.3299 H 333.3299 V 166.665 H 166.665 Z" />
        </g>`
    },
    fretty: {
        width: 200,
        height: 200,
        pattern:`
        <g class="treatment">
            <polygon points="0,20 76,96 96,76 20,0 0,0" />
            <polygon points="180,200 104,124 124,104 200,180 200,200" />
            <polygon points="4,176 176,4 196,24 24,196" />
            <polygon points="0,180 0,200 20,200" />
            <polygon points="180,0 200,0 200,20" />
        </g> `
    },
}