// Coding Train
// Daniel Shiffman
// https://www.youtube.com/thecodingtrain/

// 9.7: Drawing Object Trails - p5.js Tutorial
// https://youtu.be/vqE8DMfOajk
let wristL, wristR, dataElement;

function setup() {
  createCanvas(1920, 1080);
  
  wristL = new Particle(0, 0, "left");
  wristR = new Particle(0, 0, "right");
  
  frameRate(30);
}

function draw() {
    window.electronAPI.getPositions();
    dataElement = document.getElementById("pos-ID")
  clear();
//console.log(wristR)
    switch(true){
        case dataElement.getAttribute("data-nextControl") == "on":
            wristR.showColor();
            break;
        case dataElement.getAttribute("data-previousControl") == "on":
            wristL.showColor();
            break;
        case dataElement.getAttribute("data-nextControl") == "off"
            && dataElement.getAttribute("data-previousControl") == "off":
            wristR.show();
            wristL.show();
            break;    
    }
    wristL.update();    
    wristR.update();
}

/* function mousePressed() {
  wristR.push(new Particle(mouseX, mouseY));
} */

class Particle {

  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.history = [];
  }

  update() {
    if(this.name == "right"){
        this.x = dataElement.getAttribute("data-pos-r-x");
        this.y = dataElement.getAttribute("data-pos-r-y");
    }else{
        this.x = dataElement.getAttribute("data-pos-l-x");
        this.y = dataElement.getAttribute("data-pos-l-y");
    }

    let v = createVector(this.x, this.y);
    
    this.history.push(v);
        
    //console.log(this.history.length);
    
    if (this.history.length > 100) {
        //console.log(this.history[99])    
        this.history.splice(0, 1);
    }
  }

  show() {
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
          stroke(255,255, 255, i);
          fill(200,200,200, i);
          ellipse(pos.x, pos.y, i/2, i/2);  
          //vertex(pos.x, pos.y);
          endShape();
    }

    noStroke();
    fill(255, 204, 0)
    //ellipse(this.x, this.y, 100, 100);

  }
  
  showColor() {
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
          stroke(255,255, 255, i);
          if(this.name == "right"){
            fill(0,200,0, i);
          }else{fill(200,0,0, i);}
        
          ellipse(pos.x, pos.y, i/2, i/2);  
          //vertex(pos.x, pos.y);
          endShape();
    }

    noStroke();
    fill(255, 204, 0)
    //ellipse(this.x, this.y, 100, 100);

  }
}