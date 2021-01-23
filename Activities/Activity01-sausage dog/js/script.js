/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

"use strict";

//constant number of animals and images
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;
//initialize animal arrays
let animalImages = [];
let animals = [];
//sausageDog var
let sausageDogImage = undefined;
let sausageDog = undefined;

//Pre-load images and store them in animalImages array
function preload(){
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`); //${_} allows for a variables to be used in call, must be ``(one with ~)
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage("assets/images/sausage-dog.png");
}


// sets canvas amd creates animal objects
function setup() {
  createCanvas(windowWidth, windowHeight);

  //Create animal objects
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages); //chooses random element from array
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

  //create sausage sausageDog
  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

// Displays animals
function draw() {
  background(230, 230, 200);
  //displays animals
  for(let i = 0; i < animals.length; i++){
    animals[i].update();
  }

  sausageDog.update();
}

function mousePressed(){
  sausageDog.mousePressed();
}
