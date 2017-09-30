interface ColorAverage {
  sum: number
  red: number
  blue: number
  green: number
  alpha: number
}

namespace colorizer.filters {

  export class autoColor extends image {

    public apply() {
      this._averageColor()
    }

    private _averageColor() {
      let hsl = new Float32Array(this.dta.length)
      let dest = new Float32Array(this.dta.length)
      this.eachColor((col, idx) => {
        hsl[idx] = col.h * 360
        hsl[idx + 1] = col.s * 100
        hsl[idx + 2] = col.l * 100
        hsl[idx + 3] = col.a * 100
      })
      console.log(hsl)

      let hist = new Float32Array(256);
      let sum = 0;

      for (let i = 0; i < hsl.length; i++) {
        hist[~~hsl[i]]++;
        sum++;
      }

      let prev = hist[0];
      for (let i = 1; i < 256; i++) {
        prev = hist[i] += prev;
      }

      let norm = 255 / sum;
      for (let i = 0; i < hsl.length; i++) {
        dest[i] = hist[~~hsl[i]] * norm;
      }

      for (let i = 0, n = dest.length; i < n; i += 4) {
        let c = color.hsl(dest[i], dest[i + 1], dest[i + 2])
        this.setColorAtIndex(i, c)
      }
    }

  }

}