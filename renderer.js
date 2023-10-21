const button = document.getElementById('SubmitButton');
let moveOffScreenButton, movePrimaryScreenButton ;



window.addEventListener('DOMContentLoaded', async() => {
  getCameras();
})

function getCameras(){ 
  console.log("list of cameras")
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
          if(device.kind == "videoinput"){    
            console.log(device)
            console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            var x = document.getElementById("cameras");
            var option = document.createElement("option");
            option.text = device.label;
            option.id = device.deviceId;
            x.add(option);    
          }
      });
    })
}

button.addEventListener("click", newWindow);

function newWindow() {
  const IP = document.getElementById('IP').value;
  const Port = document.getElementById('Port').value;
  const PW = document.getElementById('PW').value;
  const Link = document.getElementById('Link').value;
  const OpenCamera = document.getElementById('cameraWindow');
  console.log("OpenCamera",OpenCamera.checked)
  
  const OpenPose = document.getElementById('poseWindow');
  console.log("OpenPose", OpenPose.checked)


  var e = document.getElementById("cameras");
  console.log(e.value)
  console.log(e.options[e.selectedIndex].text)
  var value = e.value;
  var CameraID = e.options[e.selectedIndex].id;
  console.log(`${IP}, ${Port}, ${PW}, ${Link}, ${CameraID}`);  

  if(OpenCamera.checked){ 
    window.electronAPI.cameraWindow(CameraID);
  }
  
  if(OpenPose.checked){ 
    console.log("opening Pose Window")
    window.electronAPI.poseWindow();
  }

  window.electronAPI.slideWindow(IP, Port, PW, Link);

  button.remove();
  
  const offScreenButton = document.createElement(`input`);
  offScreenButton.setAttribute("type", "button");
  offScreenButton.setAttribute("id", "offScreenButton");
  offScreenButton.setAttribute("value", "move windows off screen");
  window.document.body.appendChild(offScreenButton);
  
  moveOffScreenButton = document.getElementById('offScreenButton');
  moveOffScreenButton.addEventListener("click", moveOffScreen);

  const primaryScreenButton = document.createElement(`input`);
  primaryScreenButton.setAttribute("type", "button");
  primaryScreenButton.setAttribute("id", "primaryScreenButton");
  primaryScreenButton.setAttribute("value", "move windows to primary screen");
  window.document.body.appendChild(primaryScreenButton);
  
  movePrimaryScreenButton = document.getElementById('primaryScreenButton');
  movePrimaryScreenButton.addEventListener("click", movePrimaryScreen);
  

}

function moveOffScreen() {
    window.electronAPI.moveWindowsOffScreen();
}

function movePrimaryScreen() {
    window.electronAPI.moveWindowsToPrimaryScreen();
}