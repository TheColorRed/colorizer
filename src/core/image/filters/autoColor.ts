interface ColorAverage {
  sum: number
  red: number
  blue: number
  green: number
  alpha: number
}

namespace colorshop.filters {

  export class autoColor extends image {

    public apply() {
      this._averageColor()
    }

    private _averageColor() {

      let sumRed = 0, sumGreen = 0, sumBlue = 0
      let pixels = 0
      let max = 0, min = 100

      this.eachColor(col => {
        let l = col.luminance
        max = l > max ? l : max
        min = l < min ? l : min
      })

      console.log(min, max)

      this.eachColor((col, idx) => {
        // col.luminance < 1 && console.log(col.luminance)
        // if ((col.luminance >= min + 4 && col.luminance <= min + 5) || (col.luminance >= max - 40 && col.luminance <= max - 30)) {
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