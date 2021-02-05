/**************************************************
Template p5 project
Pippin Barr
Meg Summers

Create the game slamina with responsiveVoice and annyang
Program will speak the name of animal backwards then
the user must guess the animal by saying the name forwards
Displays the animal they said green if the animal is right,
red if it's wrong.

Things to add:
* timer (how many guesses in 1 min)
  - circle shrinking or some sort of visual aspect for timer
* correct guess counter (to give them a score)
* new gameplay screen with skip and repeat word button
* new start and end screen w/score
if there's time:
- add sound effect to right and wrong answers
**************************************************/
"use strict";

const animals = [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "groundhog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];
let currentAnimal = "";
let currentAnswer = "";
let reverseAnimal = "";
let score = 0;
let addedScore = 0;
let timer = 60;
let timed = false;
let winSound;
let soundPlayed = false;
let state = 'title';
let repeatButton = {
  x: 500, y: 750,
  w1: 300, w2: 225,
};
let bg = {
  r: 190, g:200, b:225
};

// controls annyang and displays text
function setup() {
  createCanvas(1000, 1050);

  if (annyang) {
    let commands = {
      'Is it *guess': guessAnimal,
      'Skip': changeAnimal,
      'Exit': function(){
        if (!timed){
          state = 'ending';
        }
      }
    };
    //starts annyang
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('This game requires speech recognition.');
  }
  //text defaults
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
}

function preload(){
  winSound = loadSound("assets/sounds/win.mp3");
}

// Displays if answer is right or wrong
function draw() {
  background(bg.r, bg.g, bg.b);

  if (state === 'title'){
    titleScreen();
  } else if (state === 'how to play'){
    howToPlay();
  } else if (state === 'gameplay'){
    gameplay();
  } else if (state === 'ending'){
    endScreen();
  }
}

function titleScreen(){
  push();
  noStroke();
  fill(235, 95, 95);
  ellipseMode(CENTER);
  ellipse(repeatButton.x, repeatButton.y, repeatButton.w1);
  fill(250, 145, 145);
  ellipse(repeatButton.x -300, repeatButton.y, repeatButton.w2);
  ellipse(repeatButton.x +300, repeatButton.y, repeatButton.w2);
  rectMode(CENTER);
  fill(120, 200, 255);
  rect(width/2, height/2 - 100, 850, 250);
  fill(255);
  rect(width/2, height/2 - 100, 800, 200);
  fill(0);
  textSize(28);
  textAlign(CENTER);
  text("To guess: Say 'Is it [your guess]' with the animal name\nThe name you say will appear in this box\n\nIf you're right the background will flash green,\n if you're wrong it'll flash red.", width/2, height/2 -100);
  fill(255);
  textSize(35);
  text("Click this\nbutton to start a\ntimed game", repeatButton.x, repeatButton.y);
  text("Endless\nMode", repeatButton.x -300, repeatButton.y);
  text("How To Play", repeatButton.x +300, repeatButton.y);
  textSize(35);
  text("Say 'skip' at any time to move on to the next name", width/2, height - 100);
  textSize(50);
  text("Welcome to", width/2, 65);
  textSize(175);
  text("SLAMINA", width/2, 175);
  pop();
}

function howToPlay(){
  push();
  noStroke();
  fill(235, 95, 95);
  ellipseMode(CENTER);
  ellipse(repeatButton.x, repeatButton.y +100, repeatButton.w1);
  rectMode(CENTER);
  fill(120, 200, 255);
  rect(width/2, height/3, 850, 600);
  fill(255);
  rect(width/2, height/3, 800, 550);
  fill(0);
  textSize(30);
  textAlign(CENTER);
  text("Your goal is to guess which animal name the voice\nis saying backwards", width/2, 110);
  textSize(25);
  text("For example:", width/2, 190);
  text("Endless mode", width/2, height/3 -35);
  text("Timed mode", width/2, height/3 + 125);
  textSize(24);
  text("Always wait until the background turns grey to say your next guess", width/2, height/2 + 75);
  fill(100);
  text("If the voice says 'god' then you would say 'Is it dog?'\nbecause dog backwards is god", width/2, 240);
  text("In endless mode your goal is to get as many right guesses\nin a row without messing up and resetting your score.\nYou can say 'exit' at any time to end the game.", width/2, height/3 +35);
  text("In timed mode your goal is to get as many right guesses\nas you can within one minute", width/2, height/3 +175);
  fill(255);
  textSize(45);
  text("Click return\nto go back", repeatButton.x, repeatButton.y +100);
  pop();
}

function gameplay(){
  //screen display
  push();
  noStroke();
  fill(235, 95, 95);
  ellipseMode(CENTER);
  ellipse(repeatButton.x, repeatButton.y, repeatButton.w1);
  rectMode(CENTER);
  fill(120, 200, 255);
  rect(width/2, height/2 - 100, 850, 250);
  fill(255);
  rect(width/2, height/2 - 100, 800, 200);
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text(score, width -50, 50);
  if (timed){
    text(timer, 50, 50);
  }
  text("Repeat the\nname", repeatButton.x, repeatButton.y);
  textSize(100);
  fill(0);
  text(currentAnswer, width/2, height/2 - 100);
  pop();
  //time is up
  if(timer <= 0){
    state = 'ending';
    annyang.abort();
  }
}

function endScreen(){
  push();
  noStroke();
  fill(235, 95, 95);
  ellipseMode(CENTER);
  ellipse(repeatButton.x, repeatButton.y, repeatButton.w1);
  rectMode(CENTER);
  fill(120, 200, 255);
  rect(width/2, height/2 - 100, 850, 250);
  fill(255);
  rect(width/2, height/2 - 100, 800, 200);
  fill(255);
  textSize(150);
  text(score, repeatButton.x, repeatButton.y);
  textSize(85);
  text("CONGRATULATIONS", width/2, 200);
  textSize(75);
  fill(0);
  text("Your final score is:", width/2, height/2 - 100);
  pop();

  if(!soundPlayed){
    winSound.play();
    winSoundPlay = true;
  }
}

//voice reads a new animal everytime the user clicks their mouse
function mousePressed(){
  let d = dist(mouseX, mouseY, repeatButton.x, repeatButton.y);
  let dE = dist(mouseX, mouseY, repeatButton.x -300, repeatButton.y);
  let dH = dist(mouseX, mouseY, repeatButton.x +300, repeatButton.y);

  if (d <= repeatButton.w1/2 && state === 'gameplay'){
    //stop annyang while voice is talking
    annyang.abort();
    responsiveVoice.speak(reverseAnimal);
    setTimeout(annyang.resume(), 10000);
  } else if (d <= repeatButton.w1/2 && state === 'title'){
    state = 'gameplay';
    changeAnimal();
    setInterval(function(){
      if (timer > 0){
        timer = round(timer - 0.1, 1);
      }
    }, 100);
    timed = true;
  } else if (dE <= repeatButton.w2/2 && state === 'title'){
    state = 'gameplay';
    changeAnimal();
    timed = false;
  } else if (dH <= repeatButton.w2/2 && state === 'title'){
    state = 'how to play';
  }
}

function keyPressed(){
  if(keyCode === RETURN){
    state = 'title';
  }
}

//changes the animal name the user is guessing
function changeAnimal(){
  //stop annyang from listening while voice is talking
  annyang.pause();
  currentAnimal = random(animals);
  reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal);
  setTimeout(annyang.resume(), 1500);
  //resets addScore variable
  //lets the program add to the score again
  addedScore = false;
}

//checks if guess was true
function guessAnimal(guess){
  //change to lower cause
  currentAnswer = guess.toLowerCase();
  //checks if user is right
  if (currentAnswer === currentAnimal) {
    //change background to green
    bg.r = 135;
    bg.g = 220;
    bg.b = 135;
    //resets bg to gray after 1.5 seconds
    setTimeout(function(){
      //change background to grey
      bg.r = 190;
      bg.g = 200;
      bg.b = 225;
    }, 1500);
    //adds to score
    while(!addedScore){
      score++;
      addedScore = true;
    }
    changeAnimal();
  } else if (currentAnswer != currentAnimal) {
    background(210, 85, 85);
    //change background to red
    bg.r = 210;
    bg.g = 85;
    bg.b = 85;
    setTimeout(function(){
      //change background to grey
      bg.r = 190;
      bg.g = 200;
      bg.b = 225;
    }, 1500);
    score = 0;
  }
}

//reverses a string
function reverseString(string) {
  //this code section is from pippin
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}
