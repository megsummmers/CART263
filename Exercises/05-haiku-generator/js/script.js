/***************************************************
Haiku/Story Generator
Meg Summers (with code from Pippin Barr)

Creates a randomized story from a bunch of sets and
chnages background image to match the story
****************************************************/
"use strict";

//story elements
let opening = [
  "On a cold winter's night",
  "On a sunny afternoon",
  "Once upon a time"
];

let setting = [
  "kingdom far, far away",
  "dark yet serene forest",
  "bustling central city"
];

let character = [
  "A glorious knight",
  "A tired student",
  "A rugged adventurer"
];

let sidekick = [
  "an energetic friend",
  "a fun bard",
  "a nervous mage"
];

let quest = [
  "to buy a lusturous coffee",
  "to kill the montrous beast",
  "to explore the hidden forest"
];

let problem = [
  "a long line lies ahead",
  "a group of monsters blocking their path",
  "that it was hidden from sight",
  "that it was heavily guarded"
];

let ending = [
  "No, they ran away out of fear",
  "No, they got bored",
  "No, they died.",
  "Yes, but they tripped and lost their prize",
  "Yes, they returned to home safely"
];

//variables
let button = document.getElementById('button');
let instructions = document.getElementById('instructions');
let customize = document.getElementById('customize');
let openingLine = document.getElementById('opening');
let settingLine = document.getElementById('setting');
let characterLine = document.getElementById('character');
let sidekickLine = document.getElementById('sidekick');
let questLine = document.getElementById('quest');
let problemLine = document.getElementById('problem');
let endingLine = document.getElementById('ending');

//sets up all lines with listeners and text
setupLines();
addEventListener();

//animates the story when the button is click
function changeStory(){
  //reset all lines to transparent
  for (let i=1; i<= 6; i++){
    let line = document.getElementById(`line${i}`);
    line.style['opacity'] = 0;
  }
  //reset lines to a new Story
  setupLines();
  //change button from reveal to reset
  button.innerText = "Create a new story";
  //change instructions text
  instructions.innerText = "To randomize details click on text. ";
  customize.innerText = "Customizable text will turn blue when hovered over";

  //show first line
  let i = 1;
  fadeIn(document.getElementById(`line${i}`), 0);
  //show the next line every few seconds
  setInterval(function(){
    i+= 1;
    if (i <= 6 ) {
      fadeIn(document.getElementById(`line${i}`), 0);
    }
  }, 1750);
  //change background depending on setting content
  let background = document.getElementById('setting');
  changeBackground(background);
}

//changes a lines content with fade in/out
function changeLine(event){
  fadeOut(event.target, 1);
}

//randomizes single elements with fade in and out
function setNewLine(element){
  if (element === openingLine){
    element.innerText = random(opening);
  } else if (element === settingLine){
    element.innerText = random(setting);
    changeBackground(element);
  } else if (element === characterLine){
    element.innerText = random(character);
  } else if (element === sidekickLine){
    element.innerText = random(sidekick);
  } else if (element === questLine){
    element.innerText = random(quest);
  } else if (element === problemLine){
    element.innerText = random(problem);
  } else if (element === endingLine){
    element.innerText = random(ending);
  }
}

//changes background based on setting element's text
function changeBackground(element){
  if (element.innerText === "kingdom far, far away"){
    document.body.style.backgroundImage = 'url("css/images/castle.jpg")';
  } else if (element.innerText === "bustling central city"){
    document.body.style.backgroundImage = 'url("css/images/city.jpg")';
  } else if (element.innerText === "dark yet serene forest"){
    document.body.style.backgroundImage = 'url("css/images/forest.jpg")';
  }
}

//randomly selects element from an array
function random(array){
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

//fades text to transparent
function fadeOut(element, opacity){
  opacity -= 0.02;
  element.style['opacity'] = opacity;
  if (opacity > 0){
    requestAnimationFrame(function(){
      fadeOut(element, opacity);
    })
  } else {
    setNewLine(element);
    fadeIn(element, opacity);
  }
}

//fades in text
function fadeIn(element, opacity){
  opacity += 0.02;
  element.style['opacity'] = opacity;
  if (opacity < 1){
    requestAnimationFrame(function(){
      fadeIn(element, opacity);
    })
  }
}

//sets all lines to random text
function setupLines() {
  openingLine.innerText = random(opening);
  settingLine.innerText = random(setting);
  characterLine.innerText = random(character);
  sidekickLine.innerText = random(sidekick);
  questLine.innerText = random(quest);
  problemLine.innerText = random(problem);
  endingLine.innerText = "Click to reveal the ending";
}

//adds event listeners for changing elements
function addEventListener() {
  openingLine.addEventListener('click', changeLine);
  settingLine.addEventListener('click', changeLine);
  characterLine.addEventListener('click', changeLine);
  sidekickLine.addEventListener('click', changeLine);
  questLine.addEventListener('click', changeLine);
  problemLine.addEventListener('click', changeLine);
  endingLine.addEventListener('click', changeLine);
}
