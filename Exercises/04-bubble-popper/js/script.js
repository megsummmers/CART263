/**************************************************
Template p5 project
Pippin Barr
Meg Summers

In this program the user will use their webcam to track
their finger as they try to pop the bubbles floating
around by tracking their hand with ml5.js Handpose

Things to add:
* counter
* add popping sound effect
* add more bubbles to the screen
  > allow bubbles to randomly move side to side
* add different types of bubbles
  * bad bubbles they can't pop
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
let videoRatioX;
let videoRatioY;
//pop counter
let counter = 0;
let imgBomb;
let popSound;
let bombSound;
// The name of our model
let buttonText = "Loading...";
let camSwitchText = "Webcam";
let webcam = true;
// current set of predictions
let predictions = [];
//the bubbles
let bubbleSettings = {
  types: ["good", "bad"],
  bubbles: []
};
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

function preload(){
  //images
  imgBomb = loadImage('assets/images/bomb.png');
  //sounds
  popSound = loadSound('assets/sounds/bubble-pop.mp3');
  bombSound = loadSound('assets/sounds/explosion.mp3');
}

// setup()
function setup() {
  createCanvas(960, 720);
  videoRatioX = width/640;
  videoRatioY = height/480

  video = createCapture(VIDEO);
  video.hide();

  //load Handpose
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    buttonText = "Start";
    //state = 'gameplay';
  });
  //listen for predictions
  handpose.on('predict', function(results){
    predictions = results;
  });
  //bubbles initialize
  for (let i = 0; i < 5; i++){
    bubbleSettings.bubbles.push(new Bubble(random(width), height, random(50, 200), random(-4, -8), random(bubbleSettings.types), imgBomb));
  }
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
  stroke(255);
  fill(255, 255, 255, 150);
  rectMode(CENTER);
  rect(width/2, 600, 250, 75);
  rect(width/2, 425, 300, 75);
  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(75);
  text("Welcome to Bubble Pop!", width/2, 150);
  textSize(40);
  text("Use your index finger to pop the bubbles", width/2, 250);
  text("Click the start button to begin", width/2, 550);
  text(buttonText, width/2, 615);
  text(camSwitchText, width/2, 435);
  textSize(30);
  text("Click this to switch between using your webcam\nas a background or leaving it black.", width/2, 325);
  pop();
}

function mousePressed(){
  if(state === "loading"){
    if (mouseX > width/2 - 250 /2 &&
      mouseX < width/2 + 250 /2 &&
      mouseY > 600 - 75 /2 &&
      mouseY < 600 + 75 /2 &&
      buttonText === "Start"){
      state = "gameplay";
    }
    if (mouseX > width/2 - 300 /2 &&
      mouseX < width/2 + 300 /2 &&
      mouseY > 425 - 75 /2 &&
      mouseY < 425 + 75 /2){
      if (webcam){
        camSwitchText = "No Webcam";
        webcam = false;
      } else if (!webcam){
        camSwitchText = "Webcam";
        webcam = true;
      }
    }
  }
}

function gameplay(){
  //background version
  background(0);

  //video feed version
  if (webcam){
    const flippedVideo = ml5.flipImage(video);
    image(flippedVideo, 0, 0, width, height);
  }

  //finds coords of index finger if hand is visible
  if (predictions.length > 0){
    //updates pin location
    updatePin(predictions[0]);
    //check for bubble pop
    for(let i = 0; i < bubbleSettings.bubbles.length; i++){
      let bubble = bubbleSettings.bubbles[i];
      let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);
      if (d < bubble.size/2) {
        //adds to pop counter for blue bubbles
        //resets to 0 for red bubbbles
        if (bubble.type === "good"){
          popSound.play();
          counter++;
        } else if (bubble.type === "bad"){
          bombSound.play();
          counter = 0;
        }
        bubble.reset();
      }
    }
    displayPin();
  }
  //Bubble controls
  for(let i = 0; i < bubbleSettings.bubbles.length; i++){
    let bubble = bubbleSettings.bubbles[i];
    bubble.move();
    //resets bubble when it hits the top
    if (bubble.y < 0 - bubble.size/2) {
      bubble.reset();
    }
    bubble.display();
  }
  //displays pop counter
  push();
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text(counter, width-50, 50);
  pop();
}

//updates pin location
function updatePin(prediction){
  pin.tip.x = prediction.annotations.indexFinger[3][0] * videoRatioX;
  pin.tip.y = prediction.annotations.indexFinger[3][1] * videoRatioY;
  pin.head.x = prediction.annotations.indexFinger[0][0] * videoRatioX;
  pin.head.y = prediction.annotations.indexFinger[0][1] * videoRatioY;
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
