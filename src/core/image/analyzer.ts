interface analysis {
  original: {
    width: number
    height: number
    color: {
      red: channelAnalysis
      green: channelAnalysis
      blue: channelAnalysis
      luminance: channelAnalysis
      gray: number
    }
  }
}

interface channelAnalysis {
  min?: number
  max?: number
  avg?: number
  // hues?: { hue: number, total: number }[]
  total?: number
}

namespace colorshop {
  export class analyzer {
    protected image: image
    protected analysis: analysis = {
      original: {
        width: 0,
        height: 0,
        color: {
          red: {},
          green: {},
          blue: {},
          luminance: {},
          gray: 0
        }
      }
    }

    public constructor(image: image) {
      this.image = image
      this.analysis.original.width = image.imageData.width
      this.analysis.original.height = image.imageData.height
    }

    public analyze() {
      return new Promise<analysis>(resolve => {
        let minRed = 255, minGreen = 255, minBlue = 255
        let minLuminance = 100, maxLuminance = 0
        let maxRed = 0, maxGreen = 0, maxBlue = 0
        let sumRed = 0, sumGreen = 0, sumBlue = 0, sumLuminance = 0
        // let reds: { hue: number, total: number }[] = [],
        //   greens: { hue: number, total: number }[] = [],
        //   blues: { hue: number, total: number }[] = []
        let pixels = 0
        let data = this.image.imageData.data
        for (let i = 0, l = data.length; i < l; i += 4) {
          let col = color.rgb(data[i], data[i + 1], data[i + 2], data[i + 3])
          let red = col.red
          let green = col.green
          let blue = col.blue
          let luminance = col.luminance
          // let r = reds.findIndex(i => i.hue == red)
          // let g = greens.findIndex(i => i.hue == green)
          // let b = blues.findIndex(i => i.hue == blue)
          // r > -1 ? reds[r].total++ : reds.push({ hue: red, total: 1 })
          // g > -1 ? greens[g].total++ : greens.push({ hue: green, total: 1 })
          // b > -1 ? blues[b].total++ : blues.push({ hue: blue, total: 1 })
          // Min Channel colors
          minRed = red < minRed ? red : minRed
          minGreen = green < minGreen ? green : minGreen
          minBlue = blue < minBlue ? blue : minBlue
          // Max channel colors
          maxRed = red > maxRed ? red : maxRed
          maxGreen = green > maxGreen ? green : maxGreen
          maxBlue = blue > maxBlue ? blue : maxBlue
          // Min and max luminance
          minLuminance = luminance < minLuminance ? luminance : minLuminance
          maxLuminance = luminance > maxLuminance ? luminance : maxLuminance
          // Channel sums
          sumRed += red
          sumGreen += green
          sumBlue += blue
          sumLuminance += luminance
          pixels++
        }
        let avgRed = Math.round(sumRed / pixels)
        let avgGreen = Math.round(sumGreen / pixels)
        let avgBlue = Math.round(sumBlue / pixels)
        let avgLuminance = Math.round(sumLuminance / pixels)
        this.analysis.original.color.red = {
          max: maxRed, min: minRed,
          total: sumRed, avg: avgRed,
          // hues: reds//.sort((a, b) => a.hue - b.hue)
        }
        this.analysis.original.color.green = {
          max: maxGreen, min: minGreen,
          total: sumGreen, avg: avgGreen,
          // hues: greens//.sort((a, b) => a.hue - b.hue)
        }
        this.analysis.original.color.blue = {
          max: maxBlue, min: minBlue,
          total: sumBlue, avg: avgBlue,
          // hues: blues//.sort((a, b) => a.hue - b.hue)
        }
        this.analysis.original.color.luminance = {
          max: maxLuminance, min: minLuminance,
          total: sumLuminance, avg: avgLuminance
        }
        this.analysis.original.color.gray = Math.round((avgRed + avgGreen + avgBlue) / 3)
        resolve(this.analysis)
      })
    }
  }
}