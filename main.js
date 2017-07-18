const electron = require('electron')
const {app,BrowserWindow} = electron
const windowSize = {width: 800, height:600}

app.on('ready',() => {
  let win = new BrowserWindow({width: 800, height:600})
  win.loadURL(`file://${__dirname}/index.html`)
})

exports.openWindow = (filename) => {
  let win = new BrowserWindow(windowSize)
  win.loadURL(`file://${__dirname}/${filename}.html`)
}
