self.importScripts('/colorshop.js')
self.addEventListener('message', e => {
  let img = colorshop.image.createFilter(e.data.img)
  postMessage(img)
})
