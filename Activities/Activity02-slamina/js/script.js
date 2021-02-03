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
- timer (how many guesses in 1 min)
  *circle shrinking or some sort of visual aspect for timer
- correct guess counter (to give them a score)
- new start and end screen w/score
- add sound effect to right and wrong answers
- add snarky remarks from voice
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
      "badger",
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
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
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

// controls annyang and displays text
function setup() {
  createCanvas(1000, 1000);

  if (annyang) {
    let commands = {
      'I think it is *guess': guessAnimal
    };
    //starts annyang
    annyang.addCommands(commands);
    annyang.start();

    //push();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    fill(255);
    //pop();
  } else {
    alert('This game requires speech recognition.');
  }
}

// Displays if answer is right or wrong
function draw() {
  background(0);

  if (currentAnswer === currentAnimal) {
    background(135, 220, 135);
    fill(255);
  } else {
    background(210, 85, 85);
    fill(255);
  }
}

//voice reads a new animal everytime the user clicks their mouse
function mousePressed(){
  currentAnimal = random(animals);
  let reverseAnimal = reverseString(currentAnimal);
  responsiveVoice.speak(reverseAnimal);
}

//inserts user guess in currentAnswer in lower case
function guessAnimal(guess){
  currentAnswer = guess.toLowerCase();
  console.log(currentAnswer);
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
