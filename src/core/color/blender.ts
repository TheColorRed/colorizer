namespace colorshop {

  export enum blendType {
    normal = 'normal', lighten = 'lighten', darken = 'darken', multiply = 'multiply',
    average = 'average', add = 'add', subtract = 'subtract', difference = 'difference',
    negation = 'negation', screen = 'screen', exclusion = 'exclusion', overlay = 'overlay',
    softLight = 'softLight', hardLight = 'hardLight', colorDodge = 'colorDodge', colorBurn = 'colorBurn',
    linearDodge = 'linearDodge', linearBurn = 'linearBurn', linearLight = 'linearLight',
    vividLight = 'vividLight', pinLight = 'pinLight', hardMix = 'hardMix', reflect = 'reflect',
    glow = 'glow', phoenix = 'phoenix'
  }

  export class blender {
    public static normal(ca: color, cb: color): color { return this.blend(blendType.normal, ca, cb) }
    public static lighten(ca: color, cb: color): color { return this.blend(blendType.lighten, ca, cb) }
    public static darken(ca: color, cb: color): color { return this.blend(blendType.darken, ca, cb) }
    public static multiply(ca: color, cb: color): color { return this.blend(blendType.multiply, ca, cb) }

    public static average(ca: color, cb: color): color { return this.blend(blendType.average, ca, cb) }
    public static add(ca: color, cb: color): color { return this.blend(blendType.add, ca, cb) }
    public static subtract(ca: color, cb: color): color { return this.blend(blendType.subtract, ca, cb) }
    public static difference(ca: color, cb: color): color { return this.blend(blendType.difference, ca, cb) }

    public static negation(ca: color, cb: color): color { return this.blend(blendType.negation, ca, cb) }
    public static screen(ca: color, cb: color): color { return this.blend(blendType.screen, ca, cb) }
    public static exclusion(ca: color, cb: color): color { return this.blend(blendType.exclusion, ca, cb) }
    public static overlay(ca: color, cb: color): color { return this.blend(blendType.overlay, ca, cb) }

    public static softLight(ca: color, cb: color): color { return this.blend(blendType.softLight, ca, cb) }
    public static hardLight(ca: color, cb: color): color { return this.blend(blendType.hardLight, ca, cb) }
    public static colorDodge(ca: color, cb: color): color { return this.blend(blendType.colorDodge, ca, cb) }
    public static colorBurn(ca: color, cb: color): color { return this.blend(blendType.colorBurn, ca, cb) }

    public static linearDodge(ca: color, cb: color): color { return this.blend(blendType.linearDodge, ca, cb) }
    public static linearBurn(ca: color, cb: color): color { return this.blend(blendType.linearBurn, ca, cb) }
    public static linearLight(ca: color, cb: color): color { return this.blend(blendType.linearLight, ca, cb) }

    public static vividLight(ca: color, cb: color): color { return this.blend(blendType.vividLight, ca, cb) }
    public static pinLight(ca: color, cb: color): color { return this.blend(blendType.pinLight, ca, cb) }
    public static hardMix(ca: color, cb: color): color { return this.blend(blendType.hardMix, ca, cb) }
    public static reflect(ca: color, cb: color): color { return this.blend(blendType.reflect, ca, cb) }

    public static glow(ca: color, cb: color): color { return this.blend(blendType.glow, ca, cb) }
    public static phoenix(ca: color, cb: color): color { return this.blend(blendType.phoenix, ca, cb) }

    protected static blend(type: blendType, ca: color, cb: color): color {
      let r: number = (<any>BlendValue)[type](ca.red, cb.red)
      let g: number = (<any>BlendValue)[type](ca.green, cb.green)
      let b: number = (<any>BlendValue)[type](ca.blue, cb.blue)
      let a: number = (<any>BlendValue)[type](ca.alpha, cb.alpha)
      return color.rgb(r, g, b, a)
    }
  }

  class BlendValue {

    public static normal(a: number, b: number): number {
      return a;
    }

    public static lighten(a: number, b: number): number {
      return (b > a) ? b : a;
    }

    public static darken(a: number, b: number): number {
      return (b > a) ? a : b;
    }

    public static multiply(a: number, b: number): number {
      return (a * b) / 255;
    }

    public static average(a: number, b: number): number {
      return (a + b) / 2;
    }

    public static add(a: number, b: number): number {
      return Math.min(255, (a + b));
    }

    public static subtract(a: number, b: number): number {
      return (a + b < 255) ? 0 : (a + b - 255);
    }

    public static difference(a: number, b: number): number {
      return Math.abs(a - b);
    }

    public static negation(a: number, b: number): number {
      return (255 - Math.abs(255 - a - b));
    }

    public static screen(a: number, b: number): number {
      return (255 - (((255 - a) * (255 - b)) >> 8));
    }

    public static exclusion(a: number, b: number): number {
      return a + b - 2 * a * b / 255;
    }

    public static overlay(a: number, b: number): number {
      return (b < 128) ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
    }

    public static softLight(a: number, b: number): number {
      return ((b < 128) ? (2 * ((a >> 1) + 64)) * (b / 255) : (255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255)));
    }

    public static hardLight(a: number, b: number): number {
      return this.overlay(b, a);
    }

    public static colorDodge(a: number, b: number): number {
      return ((b == 255) ? b : Math.min(255, ((a << 8) / (255 - b))));
    }

    public static colorBurn(a: number, b: number): number {
      return ((b == 0) ? b : Math.max(0, (255 - ((255 - a) << 8) / b)));
    }

    public static linearDodge(a: number, b: number): number {
      return this.add(a, b);
    }

    public static linearBurn(a: number, b: number): number {
      return this.subtract(a, b);
    }

    public static linearLight(a: number, b: number): number {
      return (b < 128) ? this.linearBurn(a, (2 * b)) : this.linearDodge(a, (2 * (b - 128)));
    }

    public static vividLight(a: number, b: number): number {
      return (b < 128) ? this.colorBurn(a, (2 * b)) : this.colorDodge(a, (2 * (b - 128)));
    }

    public static pinLight(a: number, b: number): number {
      return (b < 128) ? this.darken(a, (2 * b)) : this.lighten(a, (2 * (b - 128)));
    }

    public static hardMix(a: number, b: number): number {
      return ((this.vividLight(a, b) < 128) ? 0 : 255);
    }

    public static reflect(a: number, b: number): number {
      return ((b == 255) ? b : Math.min(255, (a * a / (255 - b))));
    }

    public static glow(a: number, b: number): number {
      return this.reflect(b, a);
    }

    public static phoenix(a: number, b: number): number {
      return (Math.min(a, b) - Math.max(a, b) + 255);
    }
  }
}