namespace colorshop.util {
  export class channel extends imageUtility {

    public get redGrayscale() { return this.getChannelGrayscale('red') }
    public get greenGrayscale() { return this.getChannelGrayscale('green') }
    public get blueGrayscale() { return this.getChannelGrayscale('blue') }

    public get red() { return this.getChannel('red') }
    public get green() { return this.getChannel('green') }
    public get blue() { return this.getChannel('blue') }

    private getChannelGrayscale(name: 'red' | 'blue' | 'green') {
      if (!['red', 'blue', 'green'].includes(name.toLowerCase())) throw new Error('Invalid channel')
      let data: number[] = new Array(this.image.imageData.data.length).fill(0)
      this.eachColor((col, idx) => {
        data[idx + 0] = col[name]
        data[idx + 1] = col[name]
        data[idx + 2] = col[name]
        data[idx + 3] = col.alpha
      })
      return Uint8ClampedArray.from(data)
    }

    private getChannel(name: 'red' | 'blue' | 'green') {
      if (!['red', 'blue', 'green'].includes(name.toLowerCase())) throw new Error('Invalid channel')
      let data: number[] = new Array(this.image.imageData.data.length).fill(0)
      this.eachColor((col, idx) => {
        data[idx + 0] = name == 'red' ? col[name] : 0
        data[idx + 1] = name == 'green' ? col[name] : 0
        data[idx + 2] = name == 'blue' ? col[name] : 0
        data[idx + 3] = col.alpha
      })
      return Uint8ClampedArray.from(data)
    }
  }
}