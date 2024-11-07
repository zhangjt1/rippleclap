let video;

let bodyPose;

let poses = [];

let ripplers = [];

let handsClose = false;

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

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", {flipped: true});
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(800, 800);
  video = createCapture(VIDEO, {flipped: true});
  video.hide();

  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  image(video, 0, 0);

  if (poses.length > 0) {
    let pose = poses[0];

    let rx = pose.right_wrist.x;
    let ry = pose.right_wrist.y;
    let lx = pose.left_wrist.x;
    let ly = pose.left_wrist.y;

    fill(255, 0, 0);
    circle(rx, ry, 20);
    fill(0, 255, 0);
    circle(lx, ly, 20);

    let d = dist(rx, ry, lx, ly);

    if (d < 70) {
      let x = (rx + lx) / 2;
      let y = (ry + ly) / 2;
      if (!handsClose) {
        ripplers.push(new Rippler(x, y));
        handsClose = true;
      }
    }
    else {
      handsClose = false;
    }
  }

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
  console.log(poses);
  ripplers.push(new Rippler(mouseX, mouseY));
  console.log(ripplers);
}
