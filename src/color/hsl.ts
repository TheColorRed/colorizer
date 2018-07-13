namespace colorizer {
  export class HSL {
    public readonly h: number
    public readonly s: number
    public readonly l: number

    public constructor(h: number, s: number, l: number) {
      this.h = clamp01(h / 360)
      this.s = clamp01(s / 100)
      this.l = clamp01(l / 100)
    }

    public static rgbToHsl(r: number, g: number, b: number) {
      r /= 255, g /= 255, b /= 255
      let max = Math.max(r, g, b), min = Math.min(r, g, b)
      let h: number = 0, s: number, l: number = (max + min) / 2

      if (max == min) {
        h = s = 0 // achromatic
      } else {
        let d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6
      }

      return new HSL(h * 360, s * 100, l * 100)
    }
  }
}