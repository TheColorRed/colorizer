namespace colorizer {

  export enum BlendType {
    Normal = 'normal', Lighten = 'lighten', Darken = 'darken', Multiply = 'multiply',
    Average = 'average', Add = 'add', Subtract = 'subtract', Difference = 'difference',
    Negation = 'negation', Screen = 'screen', Exclusion = 'exclusion', Overlay = 'overlay',
    SoftLight = 'softLight', HardLight = 'hardLight', ColorDodge = 'colorDodge', ColorBurn = 'colorBurn',
    LinearDodge = 'linearDodge', LinearBurn = 'linearBurn', LinearLight = 'linearLight',
    VividLight = 'vividLight', PinLight = 'pinLight', HardMix = 'hardMix', Reflect = 'reflect',
    Glow = 'glow', Phoenix = 'phoenix'
  }

  export class blender {
    public static normal(ca: color, cb: color) { return this.blend(BlendType.Normal, ca, cb) }
    public static lighten(ca: color, cb: color) { return this.blend(BlendType.Lighten, ca, cb) }
    public static darken(ca: color, cb: color) { return this.blend(BlendType.Darken, ca, cb) }
    public static multiply(ca: color, cb: color) { return this.blend(BlendType.Multiply, ca, cb) }

    public static average(ca: color, cb: color) { return this.blend(BlendType.Average, ca, cb) }
    public static add(ca: color, cb: color) { return this.blend(BlendType.Add, ca, cb) }
    public static subtract(ca: color, cb: color) { return this.blend(BlendType.Subtract, ca, cb) }
    public static difference(ca: color, cb: color) { return this.blend(BlendType.Difference, ca, cb) }

    public static negation(ca: color, cb: color) { return this.blend(BlendType.Negation, ca, cb) }
    public static screen(ca: color, cb: color) { return this.blend(BlendType.Screen, ca, cb) }
    public static exclusion(ca: color, cb: color) { return this.blend(BlendType.Exclusion, ca, cb) }
    public static overlay(ca: color, cb: color) { return this.blend(BlendType.Overlay, ca, cb) }

    public static softLight(ca: color, cb: color) { return this.blend(BlendType.SoftLight, ca, cb) }
    public static hardLight(ca: color, cb: color) { return this.blend(BlendType.HardLight, ca, cb) }
    public static colorDodge(ca: color, cb: color) { return this.blend(BlendType.ColorDodge, ca, cb) }
    public static colorBurn(ca: color, cb: color) { return this.blend(BlendType.ColorBurn, ca, cb) }

    public static linearDodge(ca: color, cb: color) { return this.blend(BlendType.LinearDodge, ca, cb) }
    public static linearBurn(ca: color, cb: color) { return this.blend(BlendType.LinearBurn, ca, cb) }
    public static linearLight(ca: color, cb: color) { return this.blend(BlendType.LinearLight, ca, cb) }

    public static vividLight(ca: color, cb: color) { return this.blend(BlendType.VividLight, ca, cb) }
    public static pinLight(ca: color, cb: color) { return this.blend(BlendType.PinLight, ca, cb) }
    public static hardMix(ca: color, cb: color) { return this.blend(BlendType.HardMix, ca, cb) }
    public static reflect(ca: color, cb: color) { return this.blend(BlendType.Reflect, ca, cb) }

    public static glow(ca: color, cb: color) { return this.blend(BlendType.Glow, ca, cb) }
    public static phoenix(ca: color, cb: color) { return this.blend(BlendType.Phoenix, ca, cb) }

    protected static blend(type: BlendType, ca: color, cb: color): color {
      let r: number = BlendValue[type](ca.r * 255, cb.r * 255)
      let g: number = BlendValue[type](ca.g * 255, cb.g * 255)
      let b: number = BlendValue[type](ca.b * 255, cb.b * 255)
      let a: number = BlendValue[type](ca.a * 255, cb.a * 255)
      return color.rgb(r, g, b, a)
    }
  }

  class BlendValue {

    public static normal(a: number, b: number): number {
      return a;
    }

    public static lighten(a: number, b: number): number {
      return Math.round((b > a) ? b : a);
    }

    public static darken(a: number, b: number): number {
      return Math.round((b > a) ? a : b);
    }

    public static multiply(a: number, b: number): number {
      return Math.round((a * b) / 255);
    }

    public static average(a: number, b: number): number {
      return Math.round((a + b) / 2);
    }

    public static add(a: number, b: number): number {
      return Math.round(Math.min(255, (a + b)));
    }

    public static subtract(a: number, b: number): number {
      return Math.round((a + b < 255) ? 0 : (a + b - 255));
    }

    public static difference(a: number, b: number): number {
      return Math.round(Math.abs(a - b));
    }

    public static negation(a: number, b: number): number {
      return Math.round(255 - Math.abs(255 - a - b));
    }

    public static screen(a: number, b: number): number {
      return Math.round(255 - (((255 - a) * (255 - b)) >> 8));
    }

    public static exclusion(a: number, b: number): number {
      return Math.round(a + b - 2 * a * b / 255);
    }

    public static overlay(a: number, b: number): number {
      return (b < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
    }

    public static softLight(a: number, b: number): number {
      return Math.round((b < 128) ? (2 * ((a >> 1) + 64)) * (b / 255) : (255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255)));
    }

    public static hardLight(a: number, b: number): number {
      return this.overlay(b, a);
    }

    public static colorDodge(a: number, b: number): number {
      return Math.round((b == 255) ? b : Math.min(255, ((a << 8) / (255 - b))));
    }

    public static colorBurn(a: number, b: number): number {
      return Math.round((b == 0) ? b : Math.max(0, (255 - ((255 - a) << 8) / b)));
    }

    public static linearDodge(a: number, b: number): number {
      return this.add(a, b);
    }

    public static linearBurn(a: number, b: number): number {
      return this.subtract(a, b);
    }

    public static linearLight(a: number, b: number): number {
      return Math.round((b < 128) ? this.linearBurn(a, (2 * b)) : this.linearDodge(a, (2 * (b - 128))));
    }

    public static vividLight(a: number, b: number): number {
      return Math.round((b < 128) ? this.colorBurn(a, (2 * b)) : this.colorDodge(a, (2 * (b - 128))));
    }

    public static pinLight(a: number, b: number): number {
      return Math.round((b < 128) ? this.darken(a, (2 * b)) : this.lighten(a, (2 * (b - 128))));
    }

    public static hardMix(a: number, b: number): number {
      return Math.round((this.vividLight(a, b) < 128) ? 0 : 255);
    }

    public static reflect(a: number, b: number): number {
      return Math.round((b == 255) ? b : Math.min(255, (a * a / (255 - b))));
    }

    public static glow(a: number, b: number): number {
      return this.reflect(b, a);
    }

    public static phoenix(a: number, b: number): number {
      return Math.round(Math.min(a, b) - Math.max(a, b) + 255);
    }
  }
}