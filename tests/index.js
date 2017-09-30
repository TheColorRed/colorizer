const express = require('express')
const path = require('path')

let app = express()

app.use(express.static(path.join(__dirname, 'html')))
app.use(express.static(path.join(__dirname, '../lib')))

app.listen(3000)