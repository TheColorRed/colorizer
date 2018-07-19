namespace colorshop.util {
  export abstract class imageUtility {
    protected _image: image

    public get image() { return this._image }

    public constructor(img: image) {
      this._image = img
    }

    public get data(): ImageData {
      return this.image.imageData
    }

    public setData(data: Uint8ClampedArray) {
      this.image.imageData.data.set(data)
    }

    public setColorAtIndex(index: number, color: color) {
      this.image.imageData.data[index] = color.red
      this.image.imageData.data[index + 1] = color.green
      this.image.imageData.data[index + 2] = color.blue
      this.image.imageData.data[index + 3] = color.alpha
    }

    public getColorAtIndex(index: number): color {
      return color.rgb(this.image.imageData.data[index], this.image.imageData.data[index + 1], this.image.imageData.data[index + 2], this.image.imageData.data[index + 3])
    }

    public eachColor(callback: (color: { red: number, green: number, blue: number, alpha: number, hue: number, saturation: number, luminance: number }, index: number) => void) {
      for (let i = 0, n = this.image.imageData.data.length; i < n; i += 4) {
        let r = this.image.imageData.data[i]
        let g = this.image.imageData.data[i + 1]
        let b = this.image.imageData.data[i + 2]
        let a = this.image.imageData.data[i + 3]
        let { h, s, l } = HSL.getHslFromRgb(r, g, b, a)
        callback({
          red: r,
          green: g,
          blue: b,
          alpha: a,
          hue: h * 360,
          saturation: s * 100,
          luminance: l * 100
        }, i)
      }
    }
  }
}