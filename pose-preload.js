const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  changeSlide: (Direction) => ipcRenderer.send('change-slide', Direction)
})