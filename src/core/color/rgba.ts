namespace colorizer {
  export class RGBA {
    public readonly r: number
    public readonly g: number
    public readonly b: number
    public readonly a: number

    public constructor(r: number, g: number, b: number, a?: number) {
      this.r = clamp01(r / 255)
      this.g = clamp01(g / 255)
      this.b = clamp01(b / 255)
      this.a = clamp01(a || 1)
    }

    public static hexToRgb(hex: string): RGBA | null {
      // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
      let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b
      })

      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1
      } : null
    }

    public static hslToRgb(h: number, s: number, l: number): RGBA {
      let r, g, b;

      if (s == 0) {
        r = g = b = l; // achromatic
      } else {
        let hue2rgb = function hue2rgb(p: number, q: number, t: number) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return new RGBA(r * 255, g * 255, b * 255)
    }
  }
}