namespace colorizer {

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
        typeof args[2] == 'number' ? args[2] : 100

      // Check for errors
      if (!colors || colors.length < 2) throw new Error('A gradient requires a minimum of two colors')
      if (Array.isArray(alphas) && alphas.length < 2 && alphas.length != 0) throw new Error('A gradient requires a minimum of two alphas or no alphas')

      // Prepare the gradient
      this.initColors(colors)
      this.initAlphas(alphas)
      this.makeGradient(steps)
    }

    public evaluate(time: number) {
      return this.gradient[Math.round(clamp(time, 0, 1) * (this.gradient.length - 1))]
    }

    public static grayscale(steps: number = 100) {
      return new gradient([{ color: color.hex('#fff'), offset: 0 }, { color: color.hex('#000'), offset: 1 }], steps)
    }

    public static between(color1: color, color2: color, steps: number = 100) {
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
        // If there is no point with an offset of 0, add it
        !this.alphas.some(i => i.offset == 0) && this.alphas.unshift({ alpha: this.alphas[0].alpha, offset: 0 })
        // If there is no point with an offset of 1, add it
        !this.alphas.some(i => i.offset == 1) && this.alphas.push({ alpha: this.alphas[this.alphas.length - 1].alpha, offset: 1 })
      }
    }

    private interpolateColor(color1: color, color2: color, factor: number = 0.5): color {
      return color.rgb(
        (color1.r + factor * (color2.r - color1.r)) * 255,
        (color1.g + factor * (color2.g - color1.g)) * 255,
        (color1.b + factor * (color2.b - color1.b)) * 255
      )
    }

    private makeGradient(steps: number) {
      let stepFactor = 1 / (steps - 1)
      this.gradient = []
      this.gradient.push(this.colors[0].color)
      for (let c = 0; c < this.colors.length; c += 2) {
        if (!this.colors[c] || !this.colors[c + 1]) break;
        for (let i = 1; i < steps - 1; i++) {
          this.gradient.push(this.interpolateColor(this.colors[c].color, this.colors[c + 1].color, stepFactor * i))
        }
      }
      this.gradient.push(this.colors[this.colors.length - 1].color)
      this._length = this.gradient.length
    }
  }
}