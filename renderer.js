const button = document.getElementById('SubmitButton');

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

  window.electronAPI.slideWindow(IP, Port, PW, Link);
  
  if(OpenPose.checked){ 
    window.electronAPI.poseWindow();
  }
}