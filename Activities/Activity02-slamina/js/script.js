/**************************************************
Template p5 project
Pippin Barr
Meg Summers

Create the game slamina with responsiveVoice and annyang
Program will speak the name of animal backwards then
the user must guess the animal by saying the name forwards
Displays the animal they said green if the animal is right,
red if it's wrong.
**************************************************/
"use strict";

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, 1000);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
}

function mousePressed(){
  background(255);
  if (annyang) {
    //example
    let commands = {
      'ozzy ozzy ozzy': function(){
        //responsize voice example
        responsiveVoice.speak("Oi! Oi! Oi!");
      }
    };
    //starts annyang
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('This game requires speech recognition.');
  }
  //responsiveVoice.speak("hello hello", "French Female");
}
