declare namespace colorshop { }
declare var module: any

if (typeof module !== 'undefined' && module.exports) {
  module.exports = colorshop
} else if (typeof window !== 'undefined') {
  (<any>window).colorshop = colorshop
}