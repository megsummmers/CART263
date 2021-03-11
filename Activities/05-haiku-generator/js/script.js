/**************************************************
Meg Summers

Generates a Haiku
**************************************************/
"use strict";

//variables
let fiveSyllableLines = [
  "Tonight we shall drink",
  "At dawn we shall ride",
  "You have done your best",
  "We are all forests",
  "They are all gone now"
];

let sevenSyllableLines = [
  "Tomorrow we rise to fight",
  "No one shall be left behind",
  "The moon will rise at midnight",
  "Say the things left unsaid",
  "The autumn stretches its legs"
];

let line1 = random(fiveSyllableLines);
let line2 = random(sevenSyllableLines);
let line3 = random(fiveSyllableLines);

let line1P = document.getElementById('line1');
let line2P = document.getElementById('line2');
let line3P = document.getElementById('line3');

line1P.innerText = line1;
line2P.innerText = line2;
line3P.innerText = line3;

line1P.addEventListener('click', lineClick);
line2P.addEventListener('click', lineClick);
line3P.addEventListener('click', lineClick);

function lineClick(event){
  fadeOut(event.target, 1);
}

function setNewLine(element){
  if (element === line1P || element === line3P){
    element.innerText = random(fiveSyllableLines);
  } else if (element === line2P){
    element.innerText = random(sevenSyllableLines);
  }
}

function random(array){
  //Math.floor gets rid of any decimal numbers
  //math.random gives a random number
  let index = Math.floor(Math.random() * array.length);
  return array[index];
}

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

function fadeIn(element, opacity){
  opacity += 0.02;
  element.style['opacity'] = opacity;
  if (opacity < 1){
    requestAnimationFrame(function(){
      fadeIn(element, opacity);
    })
  }
}
