namespace colorshop {

  export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max))
  }

  export function clamp01(value: number) {
    return clamp(value, 0, 1)
  }

}