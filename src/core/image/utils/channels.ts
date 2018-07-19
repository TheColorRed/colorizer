namespace colorshop.util {

  export enum channel { red = 'red', green = 'green', blue = 'blue', alpha = 'alpha', all = 'all' }

  export class channels extends imageUtility {

    public get redGrayscale() { return this.getChannelGrayscale(channel.red) }
    public get greenGrayscale() { return this.getChannelGrayscale(channel.green) }
    public get blueGrayscale() { return this.getChannelGrayscale(channel.blue) }

    public get red() { return this.getChannel(channel.red) }
    public get green() { return this.getChannel(channel.green) }
    public get blue() { return this.getChannel(channel.blue) }

    public adjust(channelName: channel, amount: number) {
      if (!this.validChannel(channelName)) throw new Error('Invalid channel')
      let data = new Uint8ClampedArray(this.image.imageData.data.length)
      amount = parseFloat(amount.toString())
      console.time()
      this.eachColor((col, idx) => {
        data[idx + 0] = col.red + (channelName == channel.red || channelName == channel.all ? amount : 0)
        data[idx + 1] = col.green + (channelName == channel.green || channelName == channel.all ? amount : 0)
        data[idx + 2] = col.blue + (channelName == channel.blue || channelName == channel.all ? amount : 0)
        data[idx + 3] = col.alpha + (channelName == channel.alpha ? amount : 0)
      })
      console.timeEnd()
      return data
    }

    private getChannelGrayscale(channelName: channel) {
      if (!this.validChannel(channelName) || channelName == channel.all || channelName == channel.alpha) throw new Error('Invalid channel')
      let data = new Uint8ClampedArray(this.image.imageData.data.length)
      this.eachColor((col, idx) => {
        data[idx + 0] = col[channelName]
        data[idx + 1] = col[channelName]
        data[idx + 2] = col[channelName]
        data[idx + 3] = col.alpha
      })
      return data
    }

    private getChannel(channelName: channel) {
      if (!this.validChannel(channelName) || channelName == channel.all || channelName == channel.alpha) throw new Error('Invalid channel')
      let data = new Uint8ClampedArray(this.image.imageData.data.length)
      this.eachColor((col, idx) => {
        data[idx + 0] = channelName == channel.red ? col.red : 0
        data[idx + 1] = channelName == channel.green ? col.green : 0
        data[idx + 2] = channelName == channel.blue ? col.blue : 0
        data[idx + 3] = col.alpha
      })
      return data
    }

    private validChannel(channel: string): channel is 'red' | 'blue' | 'green' | 'alpha' | 'all' {
      return ['red', 'blue', 'green', 'alpha', 'all'].includes(channel.toLowerCase())
    }
  }
}