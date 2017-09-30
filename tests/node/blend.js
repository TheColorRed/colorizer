const Color = require('../lib').Color
const Blender = require('../lib').Blender

let a = Color.hex('#ffffff')
let b = Color.hex('#000000')

console.log(Blender.screen(a, b).toRGB())