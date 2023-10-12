/* Transparent Google Slides player 
2023 by uuoocl🪵
MIT license
An app to play Google Slides with a tranparent background
*/


// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

let slidesWindow,P5poseWindow;

var websocketIP, websocketPort, websocketPassword, winCamera;

//Variables for P5 Overlay
var r_x, r_y, l_x, l_y, previousControl, nextControl;
 
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

//IPC APIs
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
  speakerViewWindow = event.sender;
  event.returnValue = websocketPassword
})

ipcMain.on('camera-ID', (event) => {
    console.log("sending camera ID to camera window") 
    event.returnValue = winCamera;
})


ipcMain.on('change-slide', (event, Direction) => {
    if(Direction == "Next"){
        console.log("sending next slide message to slide window") 
        slidesWindow.webContents.send('next-slide');
    }else{
        console.log("sending previous slide message to slide window") 
        slidesWindow.webContents.send('previous-slide');
    }
})


ipcMain.on('set-wrist-positions', (event, Point) => {
    console.log("Point Sent ", typeof Point, Point)
    r_x = Point.r_x * 1920;
    r_y = Point.r_y * 1080;
    l_x = Point.l_x * 1920;
    l_y = Point.l_y * 1080;    
    nextControl = Point.nextControl;
    previousControl = Point.previousControl;
})

ipcMain.on('get-wrist-positions', (event) => {
    console.log("Point Saved ", r_x, r_y)
    const result = {"r_x": r_x, "r_y": r_y, "l_x": l_x, "l_y": l_y, "nextControl": nextControl,  "previousControl": previousControl};
    console.log(typeof result)
    event.returnValue = result;
})

  ipcMain.on('open-slide-window', (event, IP, Port, PW, Link) => {
    slidesWindow = new BrowserWindow({
      width: 1915,
      height: 1075,
      frame: false,
      movable: false,
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

      slidesWindow.loadURL(Link);    

      //slidesWindow.webContents.openDevTools()
      slidesWindow.webContents.setWindowOpenHandler(({ event,url }) => {
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
                preload: path.join(__dirname,'slides-popup-preload.js')
              }
            }
          }
        }
        return { action: 'deny' }
      })
        console.log("sending appPath to new window") 
  })
 
 ipcMain.on('open-camera-window', (event, cameraId) => {
   console.log(`camera ID = ${cameraId}`)
    cameraWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
      frame: false,
      titleBarOverlay: false,
      backgroundThrottling: false,
      transparent: true,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        preload: path.join(__dirname, 'camera-preload.js')
        }
      })
  winCamera = cameraId;
  cameraWindow.loadFile('camera.html');    

  P5poseWindow = new BrowserWindow({
    width: 1918,
    height: 1078,
    x: 0,
    y: 0,
    frame: false,
    titleBarOverlay: false,
    backgroundThrottling: false,
    transparent: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      preload: path.join(__dirname, 'P5-pose-preload.js')
      }
    })
    P5poseWindow.loadFile('P5_pose.html');  
})

 ipcMain.on('open-pose-window', (event) => {
   poseWindow = new BrowserWindow({
      width: 650,
      height: 460,
      x: 0,
      y: 0,
      frame: true,
      titleBarOverlay: false,
      backgroundThrottling: false,
      transparent: true,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        preload: path.join(__dirname, 'pose-preload.js')
        }
      })
  poseWindow.loadFile('pose.html');    

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