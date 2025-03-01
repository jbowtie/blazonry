export const colors = [
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

export const furs = [
    {regex: /ermine/, val: "ermine"},
    {regex: /ermines/, val: "counter_ermine"},
    {regex: /counter ermine/, val: "counter_ermine"},
    {regex: /erminois/, val: "erminois"},
    {regex: /pean/, val: "pean"},
    {regex: /vair/, val: "vair"},
]

export const treatments = [
    {regex: /gingham/, val: "gingham"},
    {regex: /(checky|cheque?y|checkered)/, val: "checky"},
    {regex: /fretty/, val: "fretty"},
]

export const counterchanged = [
    {regex: /counter cha[nr]ged?/, val: "counterchanged"},
    {regex: /countercha[nr]ged?/, val: "counterchanged"},
    {regex: /countercoloured/, val: "counterchanged"},
    {regex: /interchanged?/, val: "counterchanged"},
    {regex: /transmuted/, val: "counterchanged"},
    {regex: /de l un en l autre/, val: "counterchanged"},
]

export const ordinaries = [
    {regex:/bars?/, val: "bar"},
    {regex:/bends?/, val: "bend"},
    {regex:/fesse?/, val: "fess"},
    {regex:/chief/, val: "chief"},
    // TODO: could be charge with same name, need to find a way to disambiguate
    {regex:/cross/, val: "cross"},
    {regex:/saltire/, val: "saltire"},
]

export const divisions = [
    {regex: /parted fesse?wise/, val: "per_fess"},
    {regex: /parted palewise/, val: "per_pale"},
    //{regex: /parted pilewise/, val: "per_pile"},
    //{regex: /parted chevronwise/, val: "per_chevron"},
    {regex: /parted bendwise/, val: "per_bend"},
    {regex: /parted saltirewise/, val: "per_saltire"},
    {regex: /(?:part(y|ed)\s+)?per pale/, val: "per_pale"},
    {regex: /(?:part(y|ed)\s+)?per fesse?/, val: "per_fess"},
    //{regex: /(?:part(y|ed)\s+)?per chief/, val: "per_chief"},
    {regex: /(?:part(y|ed)\s+)?per bend/, val: "per_bend"},
    {regex: /(?:part(y|ed)\s+)?per saltire/, val: "per_saltire"},
    {regex: /quarterly quartered/, val: "gyronny"},
    {regex: /(?:part(y|ed)\s+)?(?:per\s+)?g(i|y)ronny/, val: "gyronny"},
    {regex: /barry/, val: "barry"},
    {regex: /bendy/, val: "bendy"},
    {regex: /paly/, val: "paly"},
    //{regex: /(?:part(y|ed)\s+)?per chevron/, val: "per_chevron"},
    //{regex: /(?:part(y|ed)\s+)?per pile/, val: "per_pile"},
    //{regex: /(?:part(y|ed)\s+)?per pall/, val: "per_pall"},
]

export const charges = [
    {regex: /lions?/, val: "lion"},
    {regex: /gorgons? heads?/, val: "gorgon_head"},
]

// arbitrary cut-off at 12 for now
// DrawShield goes up to 64!
export const numbers = [
    {regex: /a|an|the|some/, val: 1},
    {regex: /1|one/, val: 1},
    {regex: /2|two/, val: 2},
    {regex: /3|three/, val: 3},
    {regex: /4|four/, val: 4},
    {regex: /5|five/, val: 5},
    {regex: /6|six/, val: 6},
    {regex: /7|seven/, val: 7},
    {regex: /8|eight/, val: 8},
    {regex: /9|nine/, val: 9},
    {regex: /10|ten/, val: 10},
    {regex: /11|eleven/, val: 11},
    {regex: /12|twelve/, val: 12},
]

export const orientation = [
    {regex: /sinister/, val: "sinister"},
    {regex: /dexter/, val: "dexter"},
    {regex: /reversed/, val: "reversed"},
    {regex: /inverted/, val: "inverted"},
]