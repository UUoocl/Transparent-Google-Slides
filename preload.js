const { contextBridge, ipcRenderer } = require('electron')
var windowId;

contextBridge.exposeInMainWorld('electronAPI', {
  slideWindow: (IP, Port, PW, Link) => ipcRenderer.send('open-slide-window', IP, Port, PW, Link),
  cameraWindow: (CameraID) => ipcRenderer.send('open-camera-window', CameraID),
  poseWindow: () => ipcRenderer.send('open-pose-window'),
  segmentationWindow: () => ipcRenderer.send('open-segmentation-window'),
  getCameraId: () => ipcRenderer.send('get-cameras'),
  moveWindowsOffScreen: () => ipcRenderer.send('move-windows-off-screen'),
  moveWindowsToPrimaryScreen: () => ipcRenderer.send('move-windows-to-primary-screen')
})

ipcRenderer.on('SET_CAMERA_SOURCE', async (event, deviceName, deviceID) => { 
  console.log(deviceID)
  var x = document.getElementById("cameras");
  var option = document.createElement("option");
  option.text = deviceName;
  option.id = deviceID;
  x.add(option);
  window.document.body.insertBefore(windowId, window.document.body.firstChild);
})
