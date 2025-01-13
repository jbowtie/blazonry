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

export const FurMap = {
    ermine: {
        width: 222,
        height: 400,
        background: ColorMap.argent,
        foreground: ColorMap.sable,
        pattern: `<polygon points="0,0 222,0 222,400 0,400" fill="%BACKGROUND%"/>
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
    }
}