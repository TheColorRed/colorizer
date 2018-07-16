namespace colorshop {
  export class image {
    protected _imgdta: ImageData
    protected _dta: Uint8ClampedArray

    public get imageData(): ImageData {
      return this._imgdta
    }

    public constructor(imageData: ImageData) {
      this._imgdta = imageData
      this._dta = imageData.data
    }

    // public static createFilter(imgData: ImageData): ImageData {
    //   let f = new filters.autoColor(imgData)
    //   f.apply()
    //   return f._imgdta
    // }

    public setColorAtIndex(index: number, color: color) {
      this._dta[index] = color.red
      this._dta[index + 1] = color.green
      this._dta[index + 2] = color.blue
      this._dta[index + 3] = color.alpha
    }

    public getColorAtIndex(index: number): color {
      return color.rgb(this._dta[index], this._dta[index + 1], this._dta[index + 2], this._dta[index + 3])
    }

    public eachColor(callback: (color: color, index: number) => void) {
      for (let i = 0, n = this._dta.length; i < n; i += 4) {
        callback(this.getColorAtIndex(i), i)
      }
    }

  }
}