const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openNewWindow: (IP, Port, PW, Link) => ipcRenderer.send('open-new-window', IP, Port, PW, Link)
})