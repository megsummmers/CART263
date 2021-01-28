/**************************************************
Template p5 project
Pippin Barr

Find the sausage dog in 15 seconds to win
the group of animals will move around to distract the player
and will disapear once the sausage dog is clicked.

To be added:
*start and ending screen
*Lower alpha once sausage dog is found
*add countdown + end timer
  + ask about why seconds are so long
*add movement to the animals to make it more difficult
*add sound effect
*add wiggle or spin when other animals are clicked (+ sound effect)
**************************************************/
"use strict";

//constant number of animals and images
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;
//initialize animal arrays
let animalImages = [];
let animals = [];
let bark;
let titleImage;
//sausageDog var
let sausageDogImage = undefined;
let sausageDog = undefined;
//timer/countdown
let counter = 15;
let finalTime = 0;
let state = "title";

//Pre-load images and store them in animalImages array
function preload(){
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`); //${_} allows for a variables to be used in call, must be ``(one with ~)
    animalImages.push(animalImage);
  }
  //load other images
  sausageDogImage = loadImage("assets/images/sausage-dog.png");
  bark = loadSound("assets/sounds/bark.wav");
  titleImage = loadImage("assets/images/title.png");
}


// sets canvas amd creates animal objects
function setup() {
  createCanvas(windowWidth, windowHeight);

  //Create animal objects
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0, width);
    let y = random(0, height);
    let speed = random(0.5, 3);
    let distance = random(50, 300);
    let animalImage = random(animalImages); //chooses random element from array
    let animal = new Animal(x, y, speed, distance, animalImage);
    animals.push(animal);
  }

  //create sausage sausageDog
  let x = random(0, width);
  let y = random(0, height);
  let speed = random(0.5, 3);
  let distance = random(50, 300);
  sausageDog = new SausageDog(x, y, speed, distance, sausageDogImage, bark);

  //timer
  for(let i=0; i<150; i++){
    setTimeout(function(){
      counter = round( counter - 0.1, 1);
    }, 100+i*100);
  }
  // setInterval(function(){
  //   if(counter>0){
  //     counter = round( counter - 0.1, 1);
  //   }
  // }, 100);
}

//Directs user to gameplay or title screen
function draw() {
  background(230, 230, 200);
  if (state === "title"){
    titleScreen();
  } else if (state === "gameplay"){
    gameplay();
  }
}
//-------------- title screen ------------
function titleScreen(){
  push();
  imageMode(CENTER);
  image(titleImage, width/2, height/2);
  pop();
}

//-------------- GAMEPLAY ----------------
function gameplay(){
  //displays animals
  for(let i = 0; i < animals.length; i++){
    animals[i].update();
  }
  //sausageDog display + check if it was found
  sausageDog.update();
  //ending screen for if user wins
  if (sausageDog.found){
    //updates all animal images to transparent
    for(let i = 0; i < animals.length; i++){
      animals[i].end = true;
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(255, 255, 230, 200);
    rect(width/2, height/2, width/3 + width/3, 300);
    fill(50, 50, 0);
    textAlign(CENTER);
    textSize(100);
    text("Congratulations!", width/2, height/2 - 25);
    textSize(70);
    text("You finished with " + counter + " seconds left!", width/2, height/2 + 75);
    pop();
  }
  //ending screen if user runs out of time
  if (counter <= 0){
    for(let i = 0; i < animals.length; i++){
      animals[i].end = true;
    }
    push();
    noStroke();
    rectMode(CENTER);
    fill(255, 255, 230, 200);
    rect(width/2, height/2, 1000, 300);
    fill(50, 50, 0);
    textAlign(CENTER);
    textSize(100);
    text("You lose", width/2, height/2 - 25);
    textSize(70);
    text("You didn't find the sausage dog in time...", width/2, height/2 + 75);
    pop();
  }
  //displays time left
  if (counter >= 0 && !sausageDog.found){
    push();
    fill(50, 50, 0);
    textSize(50);
    text(counter, width - 120, 60);
    pop();
  }
}

function mousePressed(){
  //starts the game when dog is clicked
  if (state === "title"){
    if (mouseX > width/2 - 400 /2 &&
      mouseX < width/2 + 400 /2 &&
      mouseY > (height/2 + 50) - 250 /2 &&
      mouseY < (height/2 + 50) + 250 /2){
      state = "gameplay";
    }
  } else if (state === "gameplay"){
    sausageDog.mousePressed();
    for(let i = 0; i < animals.length; i++){
      animals[i].mousePressed();
    }
  }
}
