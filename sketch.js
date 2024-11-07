let ripple_x = 0;
let ripple_y = 0;
let ripple_d = 0;

let ripplers = [];

class Rippler {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.d = 0;
    this.alpha = 255;
  }
  draw() {
    this.d += 1;
    this.alpha -= 1;

    // Draw three circles with decreasing opacity as they get larger
    for (let i = 0; i < 3; i++) {
      let diameter = this.d + i * 10; // Each circle grows by 10 pixels in diameter
      stroke(255, 255, 255, this.alpha - (i * 50)); // Set the stroke color with calculated opacity
      circle(this.x, this.y, diameter);
    }
  }
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(80, 80, 150);
  strokeWeight(2);
  noFill();

  for (let i = ripplers.length - 1; i >= 0; i--) {
    ripplers[i].draw();
    // Remove the Rippler if its diameter exceeds 50
    if (ripplers[i].d > 255) {
      ripplers.splice(i, 1);
    }
  }
}

function mousePressed() {
  ripple_x = mouseX;
  ripple_y = mouseY;
  ripple_d = 0;

  ripplers.push(new Rippler(mouseX, mouseY));
  console.log(ripplers);
}
