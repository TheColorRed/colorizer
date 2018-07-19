namespace colorshop.filters {
  export class colorExpress extends filter {
    public apply(range: number) {
      // console.log('c', this.image.channel.red())
      this.setData(this.image.channel.adjust(util.channel.green, range))
      // this.setData(this.image.channel.blue)
      // this.eachColor((col, idx) => {
      //   this.setColorAtIndex(idx, color.rgb(col.blue, col.blue, col.blue))
      //   // if (col.hue < range.min || col.hue > range.max) {
      //   //   this.setColorAtIndex(idx, col.grayscale())
      //   // }
      // })
    }
  }
}