self.importScripts('/colorizer.js')
self.addEventListener('message', e => {
  let img = colorizer.image.createFilter(e.data.img)
  postMessage(img)
})
