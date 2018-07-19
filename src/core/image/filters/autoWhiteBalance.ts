namespace colorshop.filters {

  export class autoWhiteBalance extends filter {

    public apply() {
      let sumRed = 0, sumGreen = 0, sumBlue = 0
      let pixels = 0
      let max = this.image.analysis.color.luminance.max || 100
      let min = this.image.analysis.color.luminance.min || 0

      // Sum each channel for the darkest and the lightest colors
      this.eachColor(col => {
        // let luminance = HSL.rgbToHsl(col.red, col.green, col.blue, col.alpha).l * 100
        if (col.luminance < min / 1.2 || col.luminance > max / 1.2) {
          sumRed += col.red
          sumBlue += col.blue
          sumGreen += col.green
          pixels++
        }
      })

      // Calculate the averages
      let avgRed = sumRed / pixels
      let avgGreen = sumGreen / pixels
      let avgBlue = sumBlue / pixels

      // Update the color for each pixel
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