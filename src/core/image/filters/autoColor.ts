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
      let sum = 0, pixels = 0

      this.eachColor((col, idx) => {
        // sum += (col.rgbSum) / 3
        sumRed += col.red
        sumBlue += col.blue
        sumGreen += col.green
        sum += col.rgbSum
        pixels++
      })

      let norm = sum / pixels
      let avgRed = sumRed / norm
      let avgGreen = sumGreen / norm
      let avgBlue = sumBlue / norm
      // let avg = sum / c
      // let norm = 255 / sum
      console.log(norm, sum, norm * 255)
      console.log(sumRed, sumGreen, sumBlue)
      console.log(avgRed, avgGreen, avgBlue)
      this.eachColor((col, idx) => {
        this.setColorAtIndex(idx, color.rgb(
          (col.red * avgRed),
          (col.green * avgGreen),
          (col.blue * avgBlue)
        ))
      })

      // let hist = new Float32Array(256);
      // let sum = 0;

      // for (var i = 0; i < this._dta.length; ++i) {
      //   ++hist[~~this._dta[i]];
      //   ++sum;
      // }

      // let prev = hist[0];
      // for (let i = 1; i < 256; i++) {
      //   prev = hist[i] += prev;
      // }

      // let norm = 255 / sum;
      // for (let i = 0; i < this._dta.length; i++) {
      //   this._dta[i] = hist[~~this._dta[i]] * norm;
      // }

    }

  }

}