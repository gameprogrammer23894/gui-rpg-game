const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.maximize(); // Maximizes the window (not fullscreen)
  win.loadFile('../html/index.html')
}

app.whenReady().then(() => {
  createWindow()
})