/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";

let travelData;

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
  background(255);
}

function mousePressed(){
  background(255);
  if (annyang) {
    let commands = {
      'ozzy ozzy ozzy': function(){
        responsiveVoice.speak("Oi! Oi! Oi!");
      },
      'hello': function(){
        responsiveVoice.speak("Hello there! :D");
      },
      'how are you': function(){
        responsiveVoice.speak("I'm good, how are you?");
      },
      "I'm good": function(){
        responsiveVoice.speak("That's great! :)");
      },
      "I'm bad": function(){
        responsiveVoice.speak("Oh no! Feel better soon");
      },
      "goodbye": function(){
        responsiveVoice.speak("Bye! Come back soon");
      }
    };
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('This page requires speech recognition.');
  }
  //responsiveVoice.speak("hello hello", "French Female");
}
