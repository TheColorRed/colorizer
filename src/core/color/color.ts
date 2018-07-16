namespace colorshop {

  export class color {

    private _rgba!: RGBA
    private _hsl!: HSL

    // Get RGB values
    public get rgb(): RGBA { return this._rgba }
    public get r(): number { return this._rgba.r }
    public get g(): number { return this._rgba.g }
    public get b(): number { return this._rgba.b }
    public get red(): number { return Math.round(this._rgba.r * 255) }
    public get green(): number { return Math.round(this._rgba.g * 255) }
    public get blue(): number { return Math.round(this._rgba.b * 255) }

    // Get HSL values
    public get hsl(): HSL { return this._hsl }
    public get h(): number { return this._hsl.h }
    public get s(): number { return this._hsl.s }
    public get l(): number { return this._hsl.l }
    public get hue(): number { return Math.round(this.h * 360) }
    public get saturation(): number { return parseFloat((this.s * 100).toFixed(5)) }
    public get luminance(): number { return parseFloat((this.l * 100).toFixed(5)) }

    // Get other values
    public get a(): number { return this._rgba.a }
    public get alpha(): number { return Math.round(this._rgba.a * 255) }

    public get rgbMax(): number { return Math.max(this.red, this.green, this.blue) }
    public get rgbMin(): number { return Math.min(this.red, this.green, this.blue) }
    public get rgbSum(): number { return this.red + this.green + this.blue }

    /**
     * Create a color from rgb values
     *
     * @static
     * @param {number} r The Red color from 0 - 255
     * @param {number} g The Green color from 0 - 255
     * @param {number} b The Blue color from 0 - 255
     * @param {number} [a=1] The alpha amount from 0 - 1
     * @returns {color}
     * @memberof Color
     */
    public static rgb(r: number, g: number, b: number, a: number = 1): color {
      let c = new color
      r = clamp(Math.round(r), 0, 255)
      g = clamp(Math.round(g), 0, 255)
      b = clamp(Math.round(b), 0, 255)
      c._rgba = new RGBA(r, g, b, a)
      c._hsl = HSL.rgbToHsl(r, g, b, a)
      return c
    }

    /**
     * Create a color from a hex value of '#xxxxxx' or '#xxx'
     *
     * @static
     * @param {string} hex The hex value to use
     * @param {number} [alpha=1] The alpha amount from 0 - 1
     * @returns {color}
     * @memberof Color
     */
    public static hex(hex: string, alpha: number = 1): color {
      let c = new color
      let rgba = RGBA.hexToRgb(hex)
      if (!rgba) throw new Error('Invalid Hex. Accepted formats are: "#xxxxxx" or "#xxx"')
      c._rgba = new RGBA(rgba.r, rgba.g, rgba.b, alpha)
      c._hsl = HSL.rgbToHsl(rgba.r, rgba.g, rgba.b)
      return c
    }

    /**
     * Create a color from hsl values
     *
     * @static
     * @param {number} h The hue of the color (between 0 and 360)
     * @param {number} s The saturation of the color (between 0 and 100)
     * @param {number} l The lightness of the color (between 0 and 100)
     * @returns {color}
     * @memberof Color
     */
    public static hsl(h: number, s: number, l: number, a: number = 1): color {
      let c = new color
      h = clamp(h, 0, 360)
      s = clamp(s, 0, 100)
      l = clamp(l, 0, 100)
      c._rgba = RGBA.hslToRgb(h / 360, s / 100, l / 100, a)
      c._hsl = new HSL(h, s, l, a)
      return c
    }

    /**
     * Parses a string into a usable color
     *  * Hex: "#xxxxxx" or "#xxx"
     *  * rgb: "rgb(r,g,b)" or "rgba(r,g,b,a)"
     *  * hsl: "hsl(h,s,l)"
     *
     * @static
     * @param {string} color
     * @returns
     * @memberof color
     */
    public static parse(color: string) {
      color = color.trim().toLowerCase()
      // Parse hex color strings
      if (color.startsWith('#')) return this.hex(color)
      // Parse rgba color strings
      else if (color.startsWith('rgba')) {
        let c = color.replace(/[^0-9,\.]/ig, '').split(',')
        if (c.length != 4) throw new Error('Invalid rgba, 4 parameters are required')
        let [r, g, b, a] = c.map(i => parseFloat(i))
        return this.rgb(r, g, b, a)
      }
      // Parse rgb color strings
      else if (color.startsWith('rgb')) {
        let c = color.replace(/[^0-9,\.]/ig, '').split(',')
        if (c.length != 3) throw new Error('Invalid rgba, 3 parameters are required')
        let [r, g, b] = c.map(i => parseFloat(i))
        return this.rgb(r, g, b)
      }
      // Parse hsl color strings
      else if (color.startsWith('hsl')) {
        let [h, s, l] = color.replace(/[^0-9,\.]/ig, '').split(',').map(i => parseFloat(i))
        return this.hsl(h, s, l)
      }
    }

    public toString() {
      return this.toHex()
    }

    /**
     * Get the hex value of the current color
     *
     * @returns
     * @memberof Color
     */
    public toHex() {
      return '#' +
        this._componentToHex(this.red) +
        this._componentToHex(this.green) +
        this._componentToHex(this.blue)
    }

    /**
     * Get the RGB value of the current color
     *
     * @returns
     * @memberof Color
     */
    public toRGBA() {
      return `rgba(${this.red},${this.green},${this.blue},${this.a})`
    }

    public toRGB() {
      return `rgb(${this.red},${this.green},${this.blue})`
    }

    /**
     * Get the HSL value of the current color
     *
     * @returns
     * @memberof Color
     */
    public toHSL() {
      return `hsl(${this.hue},${this.saturation}%,${this.luminance}%)`
    }

    /**
     * Lighten the color by a percentage
     *
     * @param {number} percentage The percentage to lighten the color from 0 - 100
     * @returns
     * @memberof Color
     */
    public lighten(percentage: number) {
      let l = clamp01(this.l + (clamp(percentage, 0, 100) / 100))
      return color.hsl(this.h, this.s, l, this.a)
    }

    /**
     * Darken the color by a percentage
     *
     * @param {number} percentage The percentage to darken the color from 0 - 100
     * @returns
     * @memberof Color
     */
    public darken(percentage: number) {
      let l = clamp01(this.l - (clamp(percentage, 0, 100) / 100))
      return color.hsl(this.h, this.s, l, this.a)
    }

    public saturate(percentage: number) {
      let s = clamp01(this.s - clamp(percentage, 0, 100) / 100)
      return color.hsl(this.h, s, this.l, this.a)
    }

    public desaturate(percentage: number) {
      let s = clamp01(this.s + clamp(percentage, 0, 100) / 100)
      return color.hsl(this.h, s, this.l, this.a)
    }

    public adjustHue(degrees: number) {
      let h = (this.h * 360) + degrees
      if (h > 360)
        h = Math.abs(h - 360)
      else if (h < 0)
        h = Math.abs(360 - h)
      return color.hsl(Math.round(h), this.s * 100, this.l * 100, this.a)
    }

    public complement() {
      return this.adjustHue(180)
    }

    public invert() {
      return color.rgb(255 - this.red, 255 - this.green, 255 - this.blue, this.a)
    }

    public grayscale() {
      let gray = (this.red + this.green + this.blue) / 3
      return color.rgb(gray, gray, gray, this.a)
    }

    public mix(color1: color, color2: color, percentage: number = 0.5) {
      // color1.
    }


    // Reds
    public static get indianRed(): color { return color.rgb(205, 92, 92); }
    public static get lightCoral(): color { return color.rgb(240, 128, 128); }
    public static get salmon(): color { return color.rgb(250, 128, 114); }
    public static get darkSalmon(): color { return color.rgb(233, 150, 122); }
    public static get crimson(): color { return color.rgb(220, 20, 60); }
    public static get red(): color { return color.rgb(255, 0, 0); }
    public static get firebrick(): color { return color.rgb(178, 34, 34); }
    public static get darkRed(): color { return color.rgb(139, 0, 0); }

    // Pinks
    public static get pink(): color { return color.rgb(255, 192, 203); }
    public static get lightPink(): color { return color.rgb(255, 182, 193); }
    public static get hotPink(): color { return color.rgb(255, 105, 180); }
    public static get deepPink(): color { return color.rgb(255, 20, 147); }
    public static get mediumViolet(): color { return color.rgb(199, 21, 133); }
    public static get paleViolet(): color { return color.rgb(219, 112, 147); }

    //Oranges
    public static get lightSalmon(): color { return color.rgb(255, 160, 122); }
    public static get coral(): color { return color.rgb(255, 127, 80); }
    public static get tomato(): color { return color.rgb(255, 99, 71); }
    public static get orangeRed(): color { return color.rgb(255, 69, 0); }
    public static get darkOrange(): color { return color.rgb(255, 140, 0); }
    public static get orange(): color { return color.rgb(255, 165, 0); }

    // Yellows
    public static get gold(): color { return color.rgb(255, 215, 0); }
    public static get yellow(): color { return color.rgb(255, 215, 0); }
    public static get lightYellow(): color { return color.rgb(255, 255, 224); }
    public static get lemonChiffon(): color { return color.rgb(255, 250, 205); }
    public static get lightGoldenRodYellow(): color { return color.rgb(250, 250, 210); }
    public static get papayaWhip(): color { return color.rgb(255, 239, 213); }
    public static get moccasin(): color { return color.rgb(255, 228, 181); }
    public static get peachPuff(): color { return color.rgb(255, 218, 185); }
    public static get paleGoldenRod(): color { return color.rgb(238, 232, 170); }
    public static get khaki(): color { return color.rgb(240, 230, 140); }
    public static get darkKhaki(): color { return color.rgb(189, 183, 107); }

    // Purples
    public static get lavender(): color { return color.rgb(230, 230, 250); }
    public static get thistle(): color { return color.rgb(216, 191, 216); }
    public static get plum(): color { return color.rgb(221, 160, 221); }
    public static get violet(): color { return color.rgb(238, 130, 238); }
    public static get orchid(): color { return color.rgb(218, 112, 214); }
    public static get fuchsia(): color { return color.rgb(255, 0, 255); }
    public static get magenta(): color { return color.rgb(255, 0, 255); }
    public static get mediumOrchid(): color { return color.rgb(186, 85, 211); }
    public static get mediumPurple(): color { return color.rgb(147, 112, 219); }
    public static get rebeccaPurple(): color { return color.rgb(102, 51, 153); }
    public static get blueViolet(): color { return color.rgb(138, 43, 226); }
    public static get darkViolet(): color { return color.rgb(148, 0, 211); }
    public static get darkOrchid(): color { return color.rgb(153, 50, 204); }
    public static get darkMagenta(): color { return color.rgb(139, 0, 139); }
    public static get purple(): color { return color.rgb(128, 0, 128); }
    public static get indigo(): color { return color.rgb(75, 0, 130); }
    public static get slateBlue(): color { return color.rgb(106, 90, 205); }
    public static get darkSlateBlue(): color { return color.rgb(72, 61, 139); }

    // Greens
    public static get greenYellow(): color { return color.rgb(173, 255, 47); }
    public static get chartreuse(): color { return color.rgb(127, 255, 0); }
    public static get lawnGreen(): color { return color.rgb(124, 252, 0); }
    public static get lime(): color { return color.rgb(0, 255, 0); }
    public static get limeGreen(): color { return color.rgb(50, 205, 50); }
    public static get paleGreen(): color { return color.rgb(152, 251, 152); }
    public static get lightGreen(): color { return color.rgb(144, 238, 144); }
    public static get mediumSpringGreen(): color { return color.rgb(0, 250, 154); }
    public static get springGreen(): color { return color.rgb(0, 255, 127); }
    public static get mediumSeaGreen(): color { return color.rgb(60, 179, 113); }
    public static get seaGreen(): color { return color.rgb(60, 179, 113); }
    public static get forestGreen(): color { return color.rgb(34, 139, 34); }
    public static get green(): color { return color.rgb(0, 128, 0); }
    public static get darkGreen(): color { return color.rgb(0, 100, 0); }
    public static get yellowGreen(): color { return color.rgb(154, 205, 50); }
    public static get oliveDrab(): color { return color.rgb(107, 142, 35); }
    public static get olive(): color { return color.rgb(128, 128, 0); }
    public static get darkOliveGreen(): color { return color.rgb(85, 107, 47); }
    public static get mediumAquaMarine(): color { return color.rgb(102, 205, 170); }
    public static get darkSeaGreen(): color { return color.rgb(143, 188, 139); }
    public static get lightSeaGreen(): color { return color.rgb(32, 178, 170); }
    public static get darkCyan(): color { return color.rgb(0, 139, 139); }
    public static get teal(): color { return color.rgb(0, 128, 128); }

    // Blues
    public static get cyan(): color { return color.rgb(0, 255, 255); }
    public static get lightCyan(): color { return color.rgb(224, 255, 255); }
    public static get paleTurquoise(): color { return color.rgb(175, 238, 238); }
    public static get aquaMarine(): color { return color.rgb(127, 255, 212); }
    public static get turquoise(): color { return color.rgb(64, 224, 208); }
    public static get mediumTurquoise(): color { return color.rgb(72, 209, 204); }
    public static get darkTurquoise(): color { return color.rgb(0, 206, 209); }
    public static get cadetBlue(): color { return color.rgb(95, 158, 160); }
    public static get steelBlue(): color { return color.rgb(70, 130, 180); }
    public static get lightSteelBlue(): color { return color.rgb(176, 196, 222); }
    public static get powderBlue(): color { return color.rgb(176, 224, 230); }
    public static get lightBlue(): color { return color.rgb(173, 216, 230); }
    public static get skyBlue(): color { return color.rgb(135, 206, 235); }
    public static get lightSkyBlue(): color { return color.rgb(135, 206, 250); }
    public static get deepSkyBlue(): color { return color.rgb(0, 191, 255); }
    public static get dodgerBlue(): color { return color.rgb(30, 144, 255); }
    public static get cornFlowerBlue(): color { return color.rgb(100, 149, 237); }
    public static get mediumSlateBlue(): color { return color.rgb(123, 104, 238); }
    public static get royalBlue(): color { return color.rgb(65, 105, 225); }
    public static get blue(): color { return color.rgb(0, 0, 255); }
    public static get mediumBlue(): color { return color.rgb(0, 0, 205); }
    public static get darkBlue(): color { return color.rgb(0, 0, 139); }
    public static get navy(): color { return color.rgb(0, 0, 128); }
    public static get midnightBlue(): color { return color.rgb(25, 25, 112); }
    public static get blueberry(): color { return color.rgb(79, 134, 247); }

    // Browns
    public static get cornSilk(): color { return color.rgb(255, 248, 220); }
    public static get blanchedAlmond(): color { return color.rgb(255, 235, 205); }
    public static get bisque(): color { return color.rgb(255, 228, 196); }
    public static get navajoWhite(): color { return color.rgb(255, 222, 173); }
    public static get wheat(): color { return color.rgb(245, 222, 179); }
    public static get burlyWood(): color { return color.rgb(222, 184, 135); }
    public static get tan(): color { return color.rgb(210, 180, 140); }
    public static get rosyBrown(): color { return color.rgb(188, 143, 143); }
    public static get sandyBrown(): color { return color.rgb(244, 164, 96); }
    public static get goldenRod(): color { return color.rgb(218, 165, 32); }
    public static get darkGoldenRod(): color { return color.rgb(184, 134, 11); }
    public static get peru(): color { return color.rgb(205, 133, 63); }
    public static get chocolate(): color { return color.rgb(210, 105, 30); }
    public static get saddleBrown(): color { return color.rgb(139, 69, 19); }
    public static get sienna(): color { return color.rgb(160, 82, 45); }
    public static get brown(): color { return color.rgb(165, 42, 42); }
    public static get maroon(): color { return color.rgb(128, 0, 0); }

    // Whites
    public static get white(): color { return color.rgb(255, 255, 255); }
    public static get snow(): color { return color.rgb(255, 250, 250); }
    public static get honeyDew(): color { return color.rgb(240, 255, 240); }
    public static get mintCream(): color { return color.rgb(245, 255, 250); }
    public static get azure(): color { return color.rgb(240, 255, 255); }
    public static get aliceBlue(): color { return color.rgb(240, 248, 255); }
    public static get ghostWhite(): color { return color.rgb(248, 248, 255); }
    public static get whiteSmoke(): color { return color.rgb(245, 245, 245); }
    public static get seaShell(): color { return color.rgb(255, 245, 238); }
    public static get beige(): color { return color.rgb(245, 245, 220); }
    public static get oldLace(): color { return color.rgb(253, 245, 230); }
    public static get floralWhite(): color { return color.rgb(255, 250, 240); }
    public static get ivory(): color { return color.rgb(255, 255, 240); }
    public static get antiqueWhite(): color { return color.rgb(250, 235, 215); }
    public static get linen(): color { return color.rgb(250, 240, 230); }
    public static get lavenderBlush(): color { return color.rgb(255, 240, 245); }
    public static get mistyRose(): color { return color.rgb(255, 228, 225); }

    // Grays
    public static get gainsBoro(): color { return color.rgb(220, 220, 220); }
    public static get lightGray(): color { return color.rgb(211, 211, 211); }
    public static get silver(): color { return color.rgb(192, 192, 192); }
    public static get darkGray(): color { return color.rgb(169, 169, 169); }
    public static get gray(): color { return color.rgb(128, 128, 128); }
    public static get dimGray(): color { return color.rgb(105, 105, 105); }
    public static get lightSlateGray(): color { return color.rgb(119, 136, 153); }
    public static get slateGray(): color { return color.rgb(112, 128, 144); }
    public static get darkSlateGray(): color { return color.rgb(47, 79, 79); }
    public static get black(): color { return color.rgb(0, 0, 0); }

    protected _componentToHex(c: number) {
      let hex = c.toString(16)
      return hex.length == 1 ? '0' + hex : hex
    }

  }
}