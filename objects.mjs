export const Objects = {
  ORDINARY: 0,
  DIVISION: 1,
  CHARGE: 2,
};

export const Ordinaries = {
  bar: {
  path: `<path fill-rule="evenodd" d="M-100,400h1200 v200 h-1200.000 v-200.000 z" />`
  },
  bend: {
    path: `<path fill-rule="evenodd" d="M-100,-100 l106.066,-106.066 l1200.000,1200.000 l-212.132,212.132 l-1200.000,-1200.000 l106.066,-106.066 z" />`,
    sinister: `<path fill-rule="evenodd" d="M1100,-100 l106.066,106.066   l-1200.000,1200.000   l-212.132,-212.132   l1200.000,-1200.000   l106.066,106.066 z" />`,
  },
  fess: {
    path: `<path fill-rule="evenodd" d="M-100,320h1200 v360 h-1200.000 v-360.000 z" />`,
  },
  chief: {
    path: `<path fill-rule="evenodd" d="M-100,-8h1200 v368 h-1200.000 v-368.000 z" />`,
  },
  base: {
    path: `<path fill-rule="evenodd" d="M-100,900h1200 v312 h-1200.000 v-312.000 z" />`,
  },
  saltire: {
    path: `<path fill-rule="evenodd" d="M-70.710678118655,-70.710678118655 l70.711,-70.711 l500.000,500.000 l500.000,-500.000 l141.421,141.421 l-500.000,500.000 l500.000,500.000 l-141.421,141.421 l-500.000,-500.000 l-500.000,500.000 l-141.421,-141.421 l500.000,-500.000 l-500.000,-500.000 l70.711,-70.711 z" />`,
  },
  cross: {
    path: `<path fill-rule="evenodd" d="M-100,400h500 v-500.000 h200 v500 h500 v200 h-500.000 v700 h-200.000 v-700.000 h-500.000 v-200.000 z" />`,
  },
};

export const Divisions = {
  per_pale: {
    path: `<path fill-rule="evenodd " d="M500,0h500 v1200 h-500 v-1200 z"/>`,
  },
  per_fess: {
    path: `<path fill-rule="evenodd " d="M-100,500h1200 v800 h-1200.000 v-800.000 z"/>`,
  },
  per_bend: {
    path: `<path fill-rule="evenodd " d="M-106,-106 l1211.981,1211.981 v300 h-1212.000 v-1512.000 z"/>`,
    sinister: `<path fill-rule="evenodd" d="M1000,0 v1400 h-1000.000 v-400.000 l999.849,-999.849 z" />`
  },
  per_saltire: {
    path: `<path fill-rule="evenodd " d="M500,500 l600.000,-600.000 v1200 l-600.000,-600.000 zM500,500 l-600.000,-600.000 v1200 l600.000,-600.000 z"/>`,
  },
  // these are variable (just using default of eight for now), TODO: calculate if number given
  gyronny: {
    path: `<path fill-rule="evenodd " d="M 500 500 L 500,-1500 L 1914.2135623731,-914.2135623731 L 500,500 ZM 500 500 L 2500,500 L 1914.2135623731,1914.2135623731 L 500,500 ZM 500 500 L 500,2500 L -914.21356237309,1914.2135623731 L 500,500 ZM 500 500 L -1500,500 L -914.2135623731,-914.21356237309 L 500,500 Z"/>`,
  },
  bendy: {
    path: `<path fill-rule="evenodd" d="M-535.35533905933,464.64466094067 l1270.711,1270.711   l125.623,-125.623   l-1270.711,-1270.711   l-125.623,125.623  zM-310.35533905933,189.64466094067 l1270.711,1270.711   l125.623,-125.623   l-1270.711,-1270.711   l-125.623,125.623  zM-85.355339059327,-85.355339059327 l1270.711,1270.711   l125.623,-125.623   l-1270.711,-1270.711   l-125.623,125.623  zM139.64466094067,-360.35533905933 l1270.711,1270.711   l125.623,-125.623   l-1270.711,-1270.711   l-125.623,125.623  z" />`,
    sinister: `<path fill-rule="evenodd" d="M1535.3553390593,464.64466094067 l-1270.711,1270.711   l-125.623,-125.623   l1270.711,-1270.711   l125.623,125.623  zM1310.3553390593,189.64466094067 l-1270.711,1270.711   l-125.623,-125.623   l1270.711,-1270.711   l125.623,125.623  zM1085.3553390593,-85.355339059327 l-1270.711,1270.711   l-125.623,-125.623   l1270.711,-1270.711   l125.623,125.623  zM860.35533905933,-360.35533905933 l-1270.711,1270.711   l-125.623,-125.623   l1270.711,-1270.711   l125.623,125.623  z" />`
  },
  barry: {
    path: `<path fill-rule="evenodd" d="M-100,150h1200 v150   h-1200.000   v-150.000  zM-100,450h1200 v150   h-1200.000   v-150.000  zM-100,750h1200 v150   h-1200.000   v-150.000  zM-100,1050h1200 v150   h-1200.000   v-150.000  z" />`
  },
  paly: {
    path: `<path fill-rule="evenodd" d="M125,-100h125 v1400   h-125.000   v-1400.000  zM375,-100h125 v1400   h-125.000   v-1400.000  zM625,-100h125 v1400   h-125.000   v-1400.000  zM875,-100h125 v1400   h-125.000   v-1400.000  z" />`
  },
};

// most charges will be sourced from an svg file
// some very simple charges will just be a path
export const Charges = {
  ant: { file: 'charges/ant.svg' },
  bee: { file: 'charges/bee.svg' },
  boar: { file: 'charges/boar.svg' },
  boar_head: { file: 'charges/boar-head.svg' },
  dragon: { file: 'charges/dragon.svg' },
  eagle: { file: 'charges/eagle.svg' },
  eagle_head: { file: 'charges/eagle_head.svg' },
  fox: { file: 'charges/fox.svg' },
  fox_head: { file: 'charges/fox-head.svg' },
  gorgon_head: { file: 'charges/gorgon-head.svg' },
  griffin: { file: 'charges/griffin.svg' },
  griffin_head: { file: 'charges/griffin-head.svg' },
  harpy: { file: 'charges/harpy.svg' },
  lion: { file: 'charges/lion.svg' },
  manticore: { file: 'charges/manticore.svg' },
  mermaid: { file: 'charges/mermaid.svg' },
  merman: { file: 'charges/merman.svg' },
  pegasus: { file: 'charges/pegasus.svg' },
  spider: { file: 'charges/spider.svg' },
  stag: { file: 'charges/stag.svg' },
  stag_head: { file: 'charges/stag-head.svg' },
  unicorn: { file: 'charges/unicorn.svg' },
  wolf: { file: 'charges/wolf.svg' },
  wolf_head: { file: 'charges/wolf-head.svg' },
  wyvern: { file: 'charges/wyvern.svg' },
}
