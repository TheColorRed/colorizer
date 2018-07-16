/// <reference path="../../lib/colorshop.d.ts" />

const { gradient } = require('../..')
let grayscale = gradient.grayscale()
console.log(grayscale.evaluate(0.5))