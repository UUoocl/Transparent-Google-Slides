const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    changeSlide: (Direction) => ipcRenderer.send('change-slide', Direction),
    getPositions: () => getPosition()
})

function getPosition(){
    console.log("API called")
    const PosR =  ipcRenderer.sendSync('get-wrist-positions');
    console.log("wrist position ", PosR )

    const dataElement = document.getElementById("pos-ID");
    dataElement.setAttribute("data-pos-r-x", PosR.r_x);
    dataElement.setAttribute("data-pos-r-y", PosR.r_y);
    dataElement.setAttribute("data-pos-l-x", PosR.l_x);
    dataElement.setAttribute("data-pos-l-y", PosR.l_y);
    dataElement.setAttribute("data-nextControl", PosR.nextControl);
    dataElement.setAttribute("data-previousControl", PosR.previousControl);
}