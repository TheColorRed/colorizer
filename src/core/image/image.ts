namespace colorshop {

  export class image {
    public readonly objectType = 'image'
    private _analysis!: analysis
    public imageData: ImageData
    public channel: util.channels = new util.channels(this)

    public get analysis(): analysis {
      !this._analysis && this.analyze()
      return this._analysis
    }

    public constructor(imageData: ImageData | CanvasRenderingContext2D | HTMLCanvasElement, analysis?: analysis) {
      if (imageData instanceof ImageData) this.imageData = imageData
      else if (imageData instanceof CanvasRenderingContext2D) this.imageData = imageData.getImageData(0, 0, imageData.canvas.width, imageData.canvas.height)
      else if (imageData instanceof HTMLCanvasElement) {
        let ctx = imageData.getContext('2d') as CanvasRenderingContext2D
        this.imageData = ctx.getImageData(0, 0, imageData.width, imageData.height)
      }
      else throw new Error('Invalid data. Must either be "ImageData", "CanvasRenderingContext2D" or an "HTMLCanvasElement"')
    }

    public analyze(analysis?: analysis) {
      if (analysis) this._analysis = analysis
      else this._analysis = new analyzer(this).analyze()
    }

    public static applyFilter(obj: any, action: string, options?: any): image {
      let f: filters.filter
      if (!(obj instanceof image) && obj.objectType && obj.objectType == 'image') {
        obj = new image(obj.imageData)
      }
      switch (action) {
        case 'autoColorEnhance': f = new filters.autoColorEnhance(obj); break
        case 'autoWhiteBalance': f = new filters.autoWhiteBalance(obj); break
        case 'colorExpress': f = new filters.colorExpress(obj); break
        default: return obj
      }
      f.apply(options)
      return f.image
    }
  }
}