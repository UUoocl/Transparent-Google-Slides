const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {

if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: (string) => string
  });
}

  setTimeout(setup, 100);
  setInterval(deleteBG, 500);
  
  keySim("83");
})

function keySim(k){
    document.dispatchEvent(
        new KeyboardEvent("keydown", {
            keyCode: k  
        })
    );   
}

function setup() {
    const style = document.createElement('style');
    
    style.innerHTML = `
	html {
		background-color: rgba(0,0,0,0) !important;
	}
	body {
       	background-color: rgba(0,0,0,0) !important;
	}
  .punch-viewer-content {
       	background: #0000;
	}
  :fullscreen {
       	background: #0000;
	}
  :fullscreen::backdrop {
       	background: #0000;
	}
    `; 
    window.document.body.append(style);
} 

function deleteBG() {
        const elem = document.querySelectorAll('path[fill="#abcdef"]')[0]
        if(elem){ 
          console.log(elem)
          elem.previousElementSibling.remove();
          elem.remove();
        }
    }

