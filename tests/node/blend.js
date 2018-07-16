/// <reference path="../../lib/colorshop.d.ts" />

const { color, blender } = require('../../lib/colorshop')

// console.log(color)
// let color1 = color.red
// let color2 = color.blue
// let color3 = blender.screen(color1, color2)
// console.log(color1.toHex(), color2.toHex(), color3.toHex())

let red = color.red
console.log(red.invert().adjustHue(90).toHex())