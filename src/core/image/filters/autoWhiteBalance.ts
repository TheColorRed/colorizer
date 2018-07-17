namespace colorshop.filters {

  export class autoWhiteBalance extends filter {

    public apply() {
      let sumRed = 0, sumGreen = 0, sumBlue = 0
      let pixels = 0
      let max = this.image.analysis.original.color.luminance.max || 100
      let min = this.image.analysis.original.color.luminance.min || 0

      this.eachColor(col => {
        if (col.luminance < min / 1.2 || col.luminance > max / 1.2) {
          sumRed += col.red
          sumBlue += col.blue
          sumGreen += col.green
          pixels++
        }
      })

      let avgRed = sumRed / pixels
      let avgGreen = sumGreen / pixels
      let avgBlue = sumBlue / pixels
      this.eachColor((col, idx) => {
        this.setColorAtIndex(idx, color.rgb(
          (255 / avgRed) * col.red,
          (255 / avgGreen) * col.green,
          (255 / avgBlue) * col.blue
        ))
      })
    }
  }

}