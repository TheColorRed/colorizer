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
    private steps: number = 1000

    public constructor(colors: colorPoint[], alphas: alphaPoint[]) {
      if (!colors || colors.length < 2) throw new Error('A gradient requires a minimum of two colors')
      if (Array.isArray(alphas) && alphas.length < 2 && alphas.length != 0) throw new Error('A gradient requires a minimum of two alphas or no alphas')
      this.initColors(colors)
      this.initAlphas(alphas)
    }

    public evaluate(time: number) {
      let stepFactor = 1 / (this.steps - 1)
      let interpolatedColorArray = []
      for (let c = 0; c < this.colors.length; c += 2) {
        for (let i = 0; i < this.steps; i++) {
          interpolatedColorArray.push(this.interpolateColor(this.colors[c].color, this.colors[c + 1].color, stepFactor * i))
        }
      }
      console.log(interpolatedColorArray)
      // for (let i = 0; i < this.steps; i++) {
      //   interpolatedColorArray.push(this.interpolateColor())
      // }
    }

    private interpolateColor(color1: color, color2: color, factor?: number): color {
      factor = !factor ? 0.5 : factor
      let result = color.rgb(
        Math.round(color1.r + factor * (color2.r - color1.r)),
        Math.round(color1.g + factor * (color2.g - color1.g)),
        Math.round(color1.b + factor * (color2.b - color1.b))
      )
      // var result = color1.slice();
      // for (var i = 0; i < 3; i++) {
      //   result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
      // }
      return result;
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

    private initAlphas(alphas: alphaPoint[]) {
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
  }
}