/**************************************************
Template p5 project
Pippin Barr
Meg Summers

User gives a name then the program will generate a
spy profile for them with a password that they need
to use to access their profile afterwards.

Things to add:
* Add username feature
- Use Voice for password
- Improve display
* add more categorires
If there's time:
* Multiple users
**************************************************/
"use strict";

let spyProfile ={
  name: 'REDACTED',
  alias: 'REDACTED',
  password: 'REDACTED',
  secretWeapon: 'REDACTED',
  country: 'REDACTED',
  capital: 'REDACTED',
  teamName: 'REDACTED',
  teamSymbol: 'REDACTED'
};
let tarotData;
let objectData;
let instrumentData;
let fraternitiesData;
let travelData;
let dataKey;

// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
  //check if there is a profile saved
  dataKey = prompt('Please enter your username to proceed:');
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
  fraternitiesData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/societies_and_groups/fraternities/service.json`);
  travelData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries_with_capitals.json`);
}

// draw()
function draw() {

  let profile = `SPY PROFILE:

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Password: ${spyProfile.password}
Secret Weapon:
${spyProfile.secretWeapon}`;

  let taskbar = `SPY STATUS:

Team Name:
${spyProfile.teamSymbol}, ${spyProfile.teamName}

Next Mission Location:
${spyProfile.capital}, ${spyProfile.country}`;


  push();
  textAlign(CENTER);
  textSize(40);
  fill(0);
  text("Welcome Agent " + spyProfile.name, width/2, height/3);
  textAlign(LEFT);
  textSize(25);
  text(profile, 100, height/2);
  text(taskbar, width/2, height/2);
  pop();
}

function generateSpyProfile(){
  spyProfile.name = dataKey;
  //alias
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  //Password
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
  //secret weapon
  spyProfile.secretWeapon = random(objectData.objects);
  //location
  let location = random(travelData.countries);
  spyProfile.country = location.name;
  spyProfile.capital = location.capital;
  //team
  let team = random(fraternitiesData.National);
  while (team.name === "SPURS National Honor Society" || team.name === "Upsilon Phi Upsilon fraternity"){
    team = random(fraternitiesData.National);
  }
  spyProfile.teamName = team.name;
  spyProfile.teamSymbol = team.symbol;

  //save spy profile
  localStorage.setItem(dataKey, JSON.stringify(spyProfile));
}

function setSpyData(data){
  //change all program properties to saved properties
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
  spyProfile.teamName = data.teamName;
  spyProfile.teamSymbol = data.teamSymbol;
  spyProfile.country = data.country;
  spyProfile.capital = data.capital;
}
