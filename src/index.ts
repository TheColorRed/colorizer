declare namespace colorizer { }
declare var module: any

if (typeof module !== 'undefined' && module.exports) {
  module.exports = colorizer
} else if (typeof window !== 'undefined') {
  (<any>window).colorizer = colorizer
}

// export * from './Color'
// export * from './Blender'