/**************************************************
Template p5 project
Pippin Barr
Meg Summers

In this program the user will use their webcam to track
their finger as they try to pop the bubbles floating
around by tracking their hand with ml5.js Handpose

Things to add:
- counter
- add popping sound effect
- add more bubbles to the screen
  > allow bubbles to randomly move side to side
- add different types of bubbles
  > bad bubbles they can't pop
  > bubbles with animals they need to save (new tool?)
If there's time:
- multiple tools, cahnge by going to a fist
  > pop red/bad bubbles and grow blue/good bubbles
- save fallen animals with a flat hand
**************************************************/
"use strict";

//state of program
let state = 'loading';
//webcam var
let video;
// The name of our model
let modelName = `Handpose`;
// current set of predictions
let predictions = [];
//the bubbles
let bubble;
//the pin
let pin = {
  tip: {
    x: undefined,
    y: undefined
  },
  head: {
    x: undefined,
    y: undefined,
    size: 22
  }
};

// setup()
function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  //load Handpose
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    state = 'gameplay';
  });
  //listen for predictions
  handpose.on('predict', function(results){
    predictions = results;
  });
  //Ze bubble
  bubble = {
    x: random(width),
    y: height,
    size: 100,
    vx: 0,
    vy: -5
  };
}

// draw()
function draw() {
  if (state === 'loading'){
    loadScreen();
  } else if (state === 'gameplay'){
    gameplay();
  }
}

function loadScreen(){
  background(162, 210, 245);
  push();
  stroke(0);
  textSize(25);
  textAlign(CENTER);
  text(`Loading ${modelName}...`, width/2, height/2);
  textSize(22);
  text("Once program starts use your index finger to pop the bubbles", width/2, height/2 + 35);
  pop();
}

function gameplay(){
  //background version
  //background(0);

  //video feed version
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

  //finds coords of index finger if hand is visible
  if (predictions.length > 0){
    //updates pin location
    updatePin(predictions[0]);
    //check for bubble pop
    let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
    if (d < bubble.size/2) {
      resetBubble();
    }
    displayPin();
  }

  //Bubble controls
  moveBubble();
  //resets bubble when it hits the top
  if (bubble.y < 0 - bubble.size/2) {
    resetBubble();
  }
  displayBubble();
}

function updatePin(prediction){
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

//resets bubble to the bottom of the screen
function resetBubble(){
  bubble.x = random(width);
  bubble.y = height + bubble.size/2;
}

//moves bubble based on velocity
function moveBubble(){
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
}

//displays the bubble
function displayBubble(){
  push();
  fill(0, 100, 200, 175);
  stroke(255, 255, 255, 175);
  ellipse(bubble.x, bubble.y, bubble.size);
  pop();
}
//displays pin
function displayPin(){
  push();
  noFill();
  stroke(255, 255, 255);
  strokeWeight(2);
  line(pin.head.x, pin.head.y, pin.tip.x, pin.tip.y);
  pop();
  //pin head
  push();
  noStroke();
  fill(255, 0, 0);
  ellipse(pin.head.x, pin.head.y, pin.head.size);
  pop();
}
