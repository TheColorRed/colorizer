namespace colorizer {
  export class image {
    protected imgdta: ImageData
    protected dta: Uint8ClampedArray

    public constructor(imageData: ImageData) {
      this.imgdta = imageData
      this.dta = imageData.data
    }

    public static createFilter(imgData: ImageData): ImageData {
      let f = new filters.autoColor(imgData)
      f.apply()
      return f.imgdta
    }

    public setColorAtIndex(index: number, color: color) {
      this.dta[index] = color.red
      this.dta[index + 1] = color.green
      this.dta[index + 2] = color.blue
      this.dta[index + 3] = color.alpha
    }

    public getColorAtIndex(index: number): color {
      return color.rgb(this.dta[index], this.dta[index + 1], this.dta[index + 2], this.dta[index + 3])
    }

    public eachColor(callback: (color: color, index: number) => void) {
      for (let i = 0, n = this.dta.length; i < n; i += 4) {
        callback(this.getColorAtIndex(i), i)
      }
    }

  }
}