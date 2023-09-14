// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain  } = require('electron')
const path = require('path')

let nW;

var websocketIP, websocketPort, websocketPassword;
 
 async function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: __dirname,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

ipcMain.on('wsConnect-IP', (event) => {
  console.log("sending websocket details to new window") 
  event.returnValue = websocketIP
})

ipcMain.on('wsConnect-Port', (event) => {
  console.log("sending websocket details to new window") 
  event.returnValue = websocketPort
})

ipcMain.on('wsConnect-PW', (event) => {
  console.log("sending websocket details to new window") 
  event.returnValue = websocketPassword
})

ipcMain.on('appPath', (event) => {
  console.log("sending appPath to new window") 
  event.returnValue = __dirname
})

  ipcMain.on('open-new-window', (event, IP, Port, PW, Link) => {
    nW = new BrowserWindow({
      width: 1280,
      height: 720,
      frame: false,
      titleBarOverlay: false,
      backgroundThrottling: false,
      transparent: true,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        preload: path.join(__dirname, 'slides-preload.js')
        }
      })

      websocketIP = IP;
      websocketPort = Port;
      websocketPassword = PW;
      mainLink = Link;

      nW.loadURL(Link);      
      //nW.webContents.openDevTools()
      nW.webContents.setWindowOpenHandler(({ event,url }) => {
        console.log(event)
        if (true) {
          return {
            action: 'allow',
            backgroundThrottling: false,
            overrideBrowserWindowOptions: {
              frame: true,
              fullscreenable: false,
              backgroundColor: 'white',
              webPreferences: {
                preload: path.join(__dirname,'popup-preload.js')
              }
            }
          }
        }
        return { action: 'deny' }
      })
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

