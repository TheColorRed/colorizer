namespace colorshop.filters {

  export class autoColorEnhance extends filter {

    public apply() {
      let avg = [
        this.image.analysis.original.color.red.avg || 0,
        this.image.analysis.original.color.green.avg || 0,
        this.image.analysis.original.color.blue.avg || 0
      ]
      let max = Math.max(...avg)
      let [r, g, b] = avg.map(c => 255 * c / max)
      let white = color.rgb(r, g, b)

      this.eachColor((col, idx) => {
        this.setColorAtIndex(idx, color.rgb(
          (255 / white.red) ** .45 * col.red,
          (255 / white.green) ** .45 * col.green,
          (255 / white.blue) ** .45 * col.blue
        ))
      })
    }
  }

}