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
//pop counter
let counter = 0;
let imgBomb;
let popSound;
let bombSound;
// The name of our model
let modelName = `Handpose`;
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
  //bubbles initialize
  bubbleSettings.bubbles.push(new Bubble(random(width), height, random(50, 150), random(-3, -7), random(bubbleSettings.types), imgBomb));
  bubbleSettings.bubbles.push(new Bubble(random(width), height, random(50, 150), random(-3, -7), random(bubbleSettings.types), imgBomb));
  bubbleSettings.bubbles.push(new Bubble(random(width), height, random(50, 150), random(-3, -7), random(bubbleSettings.types), imgBomb));
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
  background(0);

  //video feed version
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0, width, height);

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
  textSize(25);
  textAlign(CENTER);
  text(counter, width-30, 30);
  pop();
}

//updates pin location
function updatePin(prediction){
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
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
