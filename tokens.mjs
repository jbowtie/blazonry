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
]

export const treatments = [
    {regex: /gingham/, val: "gingham"},
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
    {regex: /(?:part(y|ed)\s+)?(?:per\s+)?g(i|y)ronny/, val: "gyronny"},
    //{regex: /(?:part(y|ed)\s+)?per chevron/, val: "per_chevron"},
    //{regex: /(?:part(y|ed)\s+)?per pile/, val: "per_pile"},
    //{regex: /(?:part(y|ed)\s+)?per pall/, val: "per_pall"},
]

export const charges = [
    {regex: /lions?/, val: "lion"},
    {regex: /gorgons? heads?/, val: "gorgon_head"},
]