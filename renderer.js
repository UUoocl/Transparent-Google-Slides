const button = document.getElementById('SubmitButton');

button.addEventListener("click", newWindow);

function newWindow() {
  const IP = document.getElementById('IP').value;
  const Port = document.getElementById('Port').value;
  const PW = document.getElementById('PW').value;
  const Link = document.getElementById('Link').value;
  console.log(`${IP}, ${Port}, ${PW}, ${Link}`);  
  window.electronAPI.openNewWindow(IP, Port, PW, Link)
}