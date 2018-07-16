ColorShop is used to manage and manipulate colors.

## Usage

ColorShop can be used with node or a web browser. Usage of each are slightly different from one another.

### Node

With node `require` is used to include ColorShop like this:

```js
const { color } = require('colorshop')
let red = color.red
```

### Web Browser

With a web browser the `script` tag is used to include ColorShop.

When using a web browser, all calls are contained within the `colorshop` namespace and can be called like this:

```html
<script src="/js/colorshop.min.js"></script>
<script>
  let red = colorshop.color.red
</script>
```

## Color

Manage, manipulate and export a single color. Adjust the color's lightness, darkness, hue, saturation and more.

Contains `141` preset colors

### Create a color

```js
// Create from a preset
let red = color.red

// Create from a hex color
let white = color.hex('#ffffff')

// Create from an rgb color
let blue      = color.rgb(0, 0, 255)
let blueAlpha = color.rgb(0, 0, 255, 0.5)

// Create from an hsl color
let yellow      = color.hsl(50, 100, 100)
let yellowAlpha = color.hsl(50, 100, 100, 0.25)
```

### Manipulate a color

```js
// Create a starting color
let red = color.red
// Invert the color and adjust the hue 90 degrees
let purple = red.invert().adjustHue(90)
console.log(purple.toHex()) // #7f00ff
```

## Gradient

Creates a gradient that can be looped over.

```js
// Creates a grayscale gradient (black-white)
let gradient = gradient.grayscale()
// Get the color at the halfway mark (a gray)
let color = gradient.evaluate(0.5)
// Write the hex color to the console
console.log(color.toHex())
```

# Blender

Blend two colors together using one of 25 different blends.

```js
// Create the first color
let color1 = color.red
// Create the second color
let color2 = color.blue
// Blend the two colors
let color3 = blender.screen(color1, color2)
// Log the results
console.log(
  color1.toHex(),
  color2.toHex(),
  color3.toHex()
)
```

* normal
* lighten
* darken
* multiply
* average
* add
* subtract
* difference
* negation
* screen
* exclusion
* overlay
* softLight
* hardLight
* colorDodge
* colorBurn
* linearDodge
* linearBurn
* linearLight
* vividLight
* pinLight
* hardMix
* reflect
* glow
* phoenix