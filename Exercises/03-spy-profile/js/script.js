/**************************************************
Template p5 project
Pippin Barr
Meg Summers

User gives a name then the program will generate a
spy profile for them with a password that they need
to use to access their profile
**************************************************/
"use strict";

let spyProfile ={
  name: 'REDACTED',
  alias: 'REDACTED',
  secretWeapon: 'REDACTED',
  password: 'REDACTED'
};
let tarotData;
let objectData;
let instrumentData;
let dataKey = `spy-profile-data`;

// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
  //check if there is a profile saved
  let data = JSON.parse(localStorage.getItem(dataKey));
  if (data){
    let password = prompt("Please enter your password to continue");
    if (password === data.password){
      setSpyData(data);
    }
  } else {
    generateSpyProfile();
  }
}

function preload(){
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
}

// draw()
function draw() {

  let profile = `SPY PROFILE - DO NOT DISTRIBUTE!!

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}`;

  push();
  textSize(40);
  textAlign(CENTER);
  fill(0);
  text("Welcome Agent " + spyProfile.name, width/2, height/3);
  textSize(25);
  text(profile, width/2, height/2);
  pop();
}

function generateSpyProfile(){
  spyProfile.name = prompt('Please enter your agent name to proceed:');
  //alias
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  //secret weapon
  spyProfile.secretWeapon = random(objectData.objects);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  //save spy profile
  localStorage.setItem(dataKey, JSON.stringify(spyProfile));
}

function setSpyData(data){
  //change all program properties to saved properties
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
}
