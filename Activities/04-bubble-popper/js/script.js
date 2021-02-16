/**************************************************
Template p5 project
Pippin Barr
Meg Summers

In this program the user will use their webcam to track
their finger as they try to pop the bubbles floating
around by tracking their hand with ml5.js Handpose
**************************************************/
"use strict";

//webcam var
let video = undefined;
//handpose model
let handpose = undefined;
// current set of predictions
let predictions = [];
//the bubbles
let bubble = undefined;

// setup()
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  //load Handpose
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    //console.log(`Model loaded`);
  });
  //listen for predictions
  handpose.on('predict', function(results){
    console.log(results);
    predictions = results;
  });
  //Ze bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -2
  };
}

// draw()
function draw() {
  background(0);

  //finds coords of index finger if hand is visible
  if (predictions.length > 0){
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();
    //pin head
    push();
    noStroke();
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();

    //check for bubble pop
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size/2){
      //change to function
      bubble.x = random(width);
      bubble.y = height + bubble.size/2;
    }
  }

  //move bubble up the screen
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
  //reset bubble when it hits the top
  if (bubble.y < -bubble.size/2) {
    bubble.x = random(width);
    bubble.y = height + bubble.size/2;
  }
  //display the bubble
  push();
  fill(0, 100, 200, 175);
  stroke(255, 255, 255);
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
