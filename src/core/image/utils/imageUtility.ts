namespace colorshop.util {
  export abstract class imageUtility {
    protected image: image

    public constructor(img: image) {
      this.image = img
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

    public eachColor(callback: (color: color, index: number) => void) {
      for (let i = 0, n = this.image.imageData.data.length; i < n; i += 4) {
        callback(this.getColorAtIndex(i), i)
      }
    }
  }
}