namespace colorshop {

  export class image {
    public analysis!: analysis
    public imageData: ImageData
    public channel: util.channel = new util.channel(this)

    public constructor(imageData: ImageData | CanvasRenderingContext2D | HTMLCanvasElement) {
      if (imageData instanceof ImageData) this.imageData = imageData
      else if (imageData instanceof CanvasRenderingContext2D) this.imageData = imageData.getImageData(0, 0, imageData.canvas.width, imageData.canvas.height)
      else if (imageData instanceof HTMLCanvasElement) {
        let ctx = imageData.getContext('2d') as CanvasRenderingContext2D
        this.imageData = ctx.getImageData(0, 0, imageData.width, imageData.height)
      }
      else throw new Error('Invalid data. Must either be "ImageData", "CanvasRenderingContext2D" or an "HTMLCanvasElement"')
      new analyzer(this)
        .analyze()
        .then(r => {
          this.analysis = r
        })
    }

    public static createFilter(image: image, action: string, options?: any): ImageData {
      let f: filters.filter
      switch (action) {
        case 'autoColorEnhance': f = new filters.autoColorEnhance(image); break
        case 'autoWhiteBalance': f = new filters.autoWhiteBalance(image); break
        case 'colorExpress': f = new filters.colorExpress(image); break
        default: return image.imageData
      }
      f.apply(options)
      return f.data
    }
  }
}