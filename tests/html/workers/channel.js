self.importScripts('/colorshop.js')
self.addEventListener('message', e => {
  // let obj = e.data.img
  let image = new colorshop.image(e.data.img)
  let data = image.channel.adjust(e.data.channel, e.data.amount)
  // let image = colorshop.image.applyFilter(obj, e.data.action, e.data.options)
  postMessage(new ImageData(data, image.imageData.width, image.imageData.height))
})