self.importScripts('/colorizer.js')
self.addEventListener('message', e => {
  let dogdata = e.data.dog
  let catdata = e.data.cat
  let imgdata = e.data.img

  for (let i = 0, n = imgdata.data.length; i < n; i += 4) {
    let dogColor = colorizer.color.rgb(dogdata[i], dogdata[i + 1], dogdata[i + 2], dogdata[i + 3])
    let catColor = colorizer.color.rgb(catdata[i], catdata[i + 1], catdata[i + 2], catdata[i + 3])
    let color = colorizer.blender[e.data.action](catColor, dogColor)
    imgdata.data[i] = Math.round(color.r * 255)
    imgdata.data[i + 1] = Math.round(color.g * 255)
    imgdata.data[i + 2] = Math.round(color.b * 255)
    imgdata.data[i + 3] = Math.round(color.a * 255)
  }
  self.postMessage(imgdata)
})