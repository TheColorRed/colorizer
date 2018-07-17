namespace colorshop.util {
  export class channel extends imageUtility {

    public red() {
      let data: number[] = new Array(this.image.imageData.data.length).fill(0)
      this.eachColor((col, idx) => {
        data[idx + 0] = col.red
        data[idx + 1] = col.red
        data[idx + 2] = col.red
        data[idx + 3] = col.a
      })
      return Uint8ClampedArray.from(data)
    }

    public green() {
      let data: number[] = new Array(this.image.imageData.data.length).fill(0)
      this.eachColor((col, idx) => {
        data[idx + 0] = col.green
        data[idx + 1] = col.green
        data[idx + 2] = col.green
        data[idx + 3] = col.a
      })
      return Uint8ClampedArray.from(data)
    }

    public blue() {
      let data: number[] = new Array(this.image.imageData.data.length).fill(0)
      this.eachColor((col, idx) => {
        data[idx + 0] = col.blue
        data[idx + 1] = col.blue
        data[idx + 2] = col.blue
        data[idx + 3] = col.a
      })
      return Uint8ClampedArray.from(data)
    }
  }
}