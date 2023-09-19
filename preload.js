const { contextBridge, ipcRenderer } = require('electron')
var windowId;

contextBridge.exposeInMainWorld('electronAPI', {
  slideWindow: (IP, Port, PW, Link) => ipcRenderer.send('open-slide-window', IP, Port, PW, Link),
  getSourceId: () => ipcRenderer.send('get-source')
})
