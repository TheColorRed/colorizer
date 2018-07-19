self.importScripts('/colorshop.js')
self.addEventListener('message', e => {
  let obj = e.data.img
  // if (obj.objectType == 'image') obj = new colorshop.image(obj.imageData, obj._analysis)
  let image = colorshop.image.applyFilter(obj, e.data.action, e.data.options)
  postMessage(image.imageData)
})