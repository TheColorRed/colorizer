namespace colorshop.filters {

  export class autoColorEnhance extends filter {

    public apply() {
      let avg = [
        this.image.analysis.color.red.avg || 0,
        this.image.analysis.color.green.avg || 0,
        this.image.analysis.color.blue.avg || 0
      ]

      // Calculate the white color
      let max = Math.max(...avg)
      let [r, g, b] = avg.map(c => 255 * c / max)
      let white = color.rgb(r, g, b)

      // Update the color for each pixel
      this.eachColor((col, idx) => {
        this.setColorAtIndex(idx, color.rgb(
          (255 / white.red) ** 0.45 * col.red,
          (255 / white.green) ** 0.45 * col.green,
          (255 / white.blue) ** 0.45 * col.blue
        ))
      })
    }
  }

}