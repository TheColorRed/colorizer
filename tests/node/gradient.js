/// <reference path="../../lib/colorizer.d.ts" />
const { gradient } = require('../../lib/colorizer')
let grayscale = gradient.grayscale()
console.log(grayscale.evaluate(0.5))