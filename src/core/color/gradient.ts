namespace colorshop {

  export interface colorPoint {
    color: color
    offset: number
  }

  export interface alphaPoint {
    alpha: number
    offset: number
  }

  export class gradient {

    private colors: colorPoint[] = []
    private alphas: alphaPoint[] = []
    private gradient: color[] = []
    private _length: number = 0

    public get length() { return this._length }

    public constructor(colors: colorPoint[])
    public constructor(colors: colorPoint[], steps: number)
    public constructor(colors: colorPoint[], alphas: alphaPoint[], steps: number)
    public constructor(...args: any[]) {
      let colors: colorPoint[] = args[0]
      let alphas: alphaPoint[] = typeof args[1] != 'number' ? args[1] : []
      let steps: number = typeof args[1] == 'number' ? args[1] :
        typeof args[2] == 'number' ? args[2] : 1000

      // Check for errors
      if (!colors || colors.length < 2) throw new Error('A gradient requires a minimum of two colors')
      if (Array.isArray(alphas) && alphas.length < 2 && alphas.length != 0) throw new Error('A gradient requires a minimum of two alphas or no alphas')

      // Prepare the gradient
      this.initColors(colors)
      this.initAlphas(alphas)
      this.makeGradient(steps)
    }

    /**
     * Gets a color at a specific offset in the gradient
     *
     * @param {number} offset The offset between 0 and 1
     * @returns {color}
     * @memberof gradient
     */
    public evaluate(offset: number): color {
      return this.gradient[Math.round(clamp(offset, 0, 1) * (this.gradient.length - 1))]
    }

    /**
     * Reverses the gradient
     *
     * @returns
     * @memberof gradient
     */
    public reverse() {
      this.gradient = this.gradient.reverse()
      return this
    }

    /**
     * Inverts the colors in the gradient
     *
     * @returns
     * @memberof gradient
     */
    public invert() {
      for (let i = 0, l = this.gradient.length; i < l; i++) {
        this.gradient[i] = this.gradient[i].invert()
      }
      return this
    }

    /**
     * Creates a gradient from black to white
     *
     * @static
     * @param {number} [steps=100]
     * @returns
     * @memberof gradient
     */
    public static grayscale(steps: number = 1000) {
      return new gradient([{ color: color.black, offset: 0 }, { color: color.white, offset: 1 }], steps)
    }

    /**
     * Create a gradient using hues 0 - 360
     *
     * @static
     * @param {number} [steps=100]
     * @returns
     * @memberof gradient
     */
    public static hue(steps: number = 1000) {
      return new gradient([
        { color: color.red, offset: 0 },
        { color: color.fuchsia, offset: 0.16 },
        { color: color.blue, offset: 0.32 },
        { color: color.cyan, offset: 0.5 },
        { color: color.green, offset: 0.66 },
        { color: color.yellow, offset: 0.82 },
        { color: color.red, offset: 1 }
      ], steps)
    }

    /**
     * Create a gradient between two colors
     *
     * @static
     * @param {color} color1
     * @param {color} color2
     * @param {number} [steps=100]
     * @returns
     * @memberof gradient
     */
    public static between(color1: color, color2: color, steps: number = 1000) {
      return new gradient(
        [{ color: color1, offset: 0 }, { color: color2, offset: 1 }],
        [{ alpha: color1.a, offset: 0 }, { alpha: color2.a, offset: 1 }],
        steps
      )
    }

    private initColors(colors: colorPoint[]) {
      this.colors = colors.map(p => {
        p.offset = clamp01(p.offset)
        return p
      }).sort((a, b) => a.offset - b.offset)
      // Remove invalid offsets
      this.colors = this.colors
        // Get offsets between 0 and 1
        .filter(i => i.offset >= 0 && i.offset <= 1)
        // Remove duplicate offsets
        .reduce<colorPoint[]>((arr, itm) => !!arr.find(i => i.offset == itm.offset) ? arr : arr.concat(itm), [])
      // If there is no point with an offset of 0, add it
      !this.colors.some(i => i.offset == 0) && this.colors.unshift({ color: this.colors[0].color, offset: 0 })
      // If there is no point with an offset of 1, add it
      !this.colors.some(i => i.offset == 1) && this.colors.push({ color: this.colors[this.colors.length - 1].color, offset: 1 })
    }

    private initAlphas(alphas?: alphaPoint[]) {
      if (!Array.isArray(alphas) || alphas.length == 0) {
        this.alphas.push({ alpha: 1, offset: 0 })
        this.alphas.push({ alpha: 1, offset: 1 })
      } else {
        this.alphas = alphas.map(a => {
          a.offset = clamp01(a.offset)
          a.alpha = clamp01(a.alpha)
          return a
        }).sort((a, b) => a.offset - b.offset)
      }
      // Remove invalid offsets
      this.alphas = this.alphas
        // Get offsets between 0 and 1
        .filter(i => i.offset >= 0 && i.offset <= 1)
        // Remove duplicate offsets
        .reduce<alphaPoint[]>((arr, itm) => !!arr.find(i => i.offset == itm.offset) ? arr : arr.concat(itm), [])
      // If there is no point with an offset of 0, add it
      !this.alphas.some(i => i.offset == 0) && this.alphas.unshift({ alpha: this.alphas[0].alpha, offset: 0 })
      // If there is no point with an offset of 1, add it
      !this.alphas.some(i => i.offset == 1) && this.alphas.push({ alpha: this.alphas[this.alphas.length - 1].alpha, offset: 1 })
    }

    private interpolateColor(color1: color, color2: color, alpha1: number, alpha2: number, factor: number = 0.5): color {
      return color.rgb(
        (color1.r + factor * (color2.r - color1.r)) * 255,
        (color1.g + factor * (color2.g - color1.g)) * 255,
        (color1.b + factor * (color2.b - color1.b)) * 255,
        (alpha1 + factor * (alpha2 - alpha1)),
      )
    }

    private makeGradient(steps: number) {
      this.gradient = []
      for (let c = 0; c < this.colors.length; c++) {
        if (!this.colors[c] || !this.colors[c + 1]) break;
        // Current color info
        let offset1 = this.colors[c].offset * steps
        let color1 = this.colors[c].color
        let alpha1 = this.colors[c].color.a

        // Next color info
        let offset2 = this.colors[c + 1].offset * steps
        let color2 = this.colors[c + 1].color
        let alpha2 = this.colors[c + 1].color.a

        // Generate array items
        let numSteps = Math.abs(offset1 - offset2)
        let stepFactor = 1 / (numSteps - 1)
        for (let i = 0; i < numSteps; i++) {
          this.gradient.push(this.interpolateColor(color1, color2, alpha1, alpha2, stepFactor * i))
        }
      }
    }
  }
}