export const Objects = {
  ORDINARY: 0,
  DIVISION: 1,
  CHARGE: 2,
};

export const Ordinaries = {
  bend: {
    path: `<path fill-rule="evenodd" d="M-100,-100 l106.066,-106.066 l1200.000,1200.000 l-212.132,212.132 l-1200.000,-1200.000 l106.066,-106.066 z" />`,
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
  },
  per_saltire: {
    path: `<path fill-rule="evenodd " d="M500,500 l600.000,-600.000 v1200 l-600.000,-600.000 zM500,500 l-600.000,-600.000 v1200 l600.000,-600.000 z"/>`,
  },
  gyronny: {
    path: `<path fill-rule="evenodd " d="M 500 500 L 500,-1500 L 1914.2135623731,-914.2135623731 L 500,500 ZM 500 500 L 2500,500 L 1914.2135623731,1914.2135623731 L 500,500 ZM 500 500 L 500,2500 L -914.21356237309,1914.2135623731 L 500,500 ZM 500 500 L -1500,500 L -914.2135623731,-914.21356237309 L 500,500 Z"/>`,
  },
};

// most charges will be sourced from an svg file
// some very simple charges will just be a path
export const Charges = {
  lion: { file: 'charges/lion.svg' },
  gorgon_head: { file: 'charges/gorgon-head.svg' },
}
