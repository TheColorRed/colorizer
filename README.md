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

### Create a gradient

Gradients can be created by calling a prebuilt gradient or by creating a custom one. Gradients are created with steps and by default each gradient is created with `1000` steps. This number can be adjusted by passing a number as one of the parameters; the more steps there are the more colors there will be between stops, and the less steps the less colors between stops.

```js
// Creates a preset gradient (black-white)
let gradient = gradient.grayscale()

// Creates a gradient between two colors
// Uses the alpha channel of the color to create alpha
let redBlue = gradient.between(color.red, color.blue)

// Creates a custom gradient with alpha
// Leave out the alpha parameter for an alpha of 1
let custom = new gradient([
  { color: color.red,   offset: 0 },
  { color: color.green, offset: 0.5 },
  { color: color.blue,  offset: 1 }
], [
  { alpha: 1,   offset: 0 },
  { alpha: 0.5, offset: 0.25 },
  { alpha: 1,   offset: 0.5 },
  { alpha: 0.5, offset: 0.75 },
  { alpha: 1,   offset: 1 }
])
```

### Evaluate gradient

A color can be selected from the gradient using `evaluate` with a number parameter between `1` and `0`.

```js
// Creates a gradient with the primary hues
let gradient = gradient.hue()
// Get the color at the halfway mark
let color = gradient.evaluate(0.5)
// Write the hex color to the console
console.log(color.toHex())
```

Using a loop, multiple `divs` can be added to a page to display a gradient.

```css
body > div {
  display: inline-block;
  height: 100px;
  width: calc(100vw / 500);
}
```

```js
// Creates a gradient with the primary hues
let gradient = gradient.hue()
let str = ''
for (let i = 0; i < 500; i++) {
  let color = gradient.evaluate(i / 500)
  str += `<div style="background-color: ${color}"></div>`
}
document.body.innerHTML = str
```

# Blender

Two colors can be blended together using one of 25 different blend modes.

```js
// Blend two colors using screen
let color = blender.screen(color.red, color.blue)
// Log the results
console.log(color.toHex())
```

### Blend modes

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