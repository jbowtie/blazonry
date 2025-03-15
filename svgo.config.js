// We can use SVGO to pre-process any files we adopt from other sources
// important not to lose any license information embedded in said files
module.exports = {
  js2svg: { indent: 2, pretty: true },
  plugins: [
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "convertStyleToAttrs",
    "cleanupAttrs",
    "cleanupIds",
    "removeUselessDefs",
    "cleanupNumericValues",
    {name: "convertColors", params:{names2hex: true, shorthex: true, shortname: false}},
    "removeEmptyAttrs",
    // remove any primary color fills, they will be replaced by tincture
    {name: "removeAttrs", params: {attrs: "*:fill:#(f00|ff0|0f0|00f|f0f|0ff)"}},
    "removeEmptyContainers",
    "removeUnusedNS"
  ]
}