self.importScripts('/colorizer.js')
self.addEventListener('message', e => {
  let dog = new colorizer.image(e.data.dog)
  let cat = new colorizer.image(e.data.cat)
  let img = new colorizer.image(e.data.img)

  img.eachColor((col, idx) => {
    img.setColorAtIndex(idx,
      colorizer.blender[e.data.action](
        cat.getColorAtIndex(idx),
        dog.getColorAtIndex(idx)
      )
    )
  })

  self.postMessage(img.imageData)
})