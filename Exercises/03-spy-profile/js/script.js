/**************************************************
Template p5 project
Pippin Barr
Meg Summers

User says a name then the program will generate a
spy profile for them with a password that they need
to use to access their unique profile afterwards.

Things added from activity:
- The program uses names as data keys allowing for
multiple user profiles to be stored and accessed.
- The program uses voice recognition to enter a
profile by name and an alert to enter their unique password.
- The program's design was redone and has 2 new
categories team name/symbol and current mission location.
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
let bg;
let dataKey;
let state = "login";

// setup()
function setup() {
  createCanvas(windowWidth, windowHeight);

  if (annyang) {
    let commands = {
      'My name is agent *name': checkName,
      'Reset my spy profile': generateSpyProfile,
      'Delete my spy profile': function(){
        if(state === 'profile'){
          //removes storage in datakey and goes back to login page
          localStorage.removeItem(dataKey);
          resetSpyData();
          state = 'login';
        } else {//stops user from using this while not in a profile
          alert("You must be loged in to delete a profile.");
        }
      },
      'Exit my spy profile': function(){
        if(state === 'profile'){ //resets everything and goes back to login
          resetSpyData();
        } else {//stops user from using this while not in a profile
          alert("You must be loged in to exit a profile.");
        }
      }
    };
    //starts annyang
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('This game requires speech recognition.');
  }
}

//preload for the JSON files and background image
function preload(){
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  fraternitiesData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/societies_and_groups/fraternities/service.json`);
  travelData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries_with_capitals.json`);
  bg = loadImage('assets/images/spy_background.jpg');
}

// draw controls which screen is shown
function draw() {
  background(bg);
  if(state === 'login'){
    loginScreen();
  } else if(state === 'profile'){
    profileScreen();
  }
}

//login screen display
function loginScreen(){
  push();
  noStroke();
  fill(35, 55, 95);
  rectMode(CORNER);
  rect(width/4, height/3, width/2, height/3);
  fill(255);
  rect(width/4 + 25, height/3 + 50, width/2 - 50, height/4 + 25);
  textAlign(CENTER);
  textSize(80);
  fill(255);
  text("Welcome to the\nSecret Organization", width/2, height/5);
  fill(0);
  textAlign(CENTER);
  textSize(32);
  textFont("courier");
  text("Please say your access name to continue\nSay 'My name is agent [name]'", width/2, height/2);
  pop();
}

//profile screen display
function profileScreen(){
  let profile = `BASIC INFO:

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Password: ${spyProfile.password}
Secret Weapon:
${spyProfile.secretWeapon}`;

  let taskbar = `CURRENT STATUS:

Team Name:
${spyProfile.teamSymbol}, ${spyProfile.teamName}

Next Mission Location:
${spyProfile.capital}, ${spyProfile.country}`;

  let profileCommands = `To reset your profile's information say "Reset my spy profile"
  To delete your profile say "Delete my spy profile"
  To return to the login screen say "Exit my spy profile"`;

  push();
  noStroke();
  fill(35, 55, 95, 200);
  rect(width/4, height/5 - 25, width/2, 125);
  rect(width/4, height/4 + height/2 - 50, width/2, 150);
  fill(35, 55, 95);
  rect(width/4, height/3, width/2, height/3);
  fill(255);
  rect(width/4 + 25, height/3 + 50, width/2 - 50, height/4 + 25);
  textAlign(CENTER);
  textSize(80);
  fill(255);
  text("Welcome Agent " + spyProfile.name, width/2, height/4);
  textSize(25);
  text("SPY PROFILE", width/2, height/3 +35);
  text(profileCommands, width/2, height/4 + height/2);
  textAlign(LEFT);
  textFont("courier");
  fill(0);
  text(profile, width/4 + 50, height/3 + 100);
  text(taskbar, width/2, height/3 + 100);
  pop();
}

function checkName(name){
  if (state === 'login'){ //makes sure user is on login screen
    //check if there is a profile saved
    dataKey = name;
    let data = JSON.parse(localStorage.getItem(dataKey));
    if (data){
      let password = prompt("Please enter your password to continue");
      if (password === data.password){
        setSpyData(data);
      }
    } else {
      alert("No profile detected. Creating a spy profile now...");
      generateSpyProfile();
    }
    state = "profile";
  }
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

function resetSpyData(){
  //resets all spy profile variables to default
  spyProfile.name = 'REDACTED';
  spyProfile.alias = 'REDACTED';
  spyProfile.secretWeapon = 'REDACTED';
  spyProfile.password = 'REDACTED';
  spyProfile.teamName = 'REDACTED';
  spyProfile.teamSymbol = 'REDACTED';
  spyProfile.country = 'REDACTED';
  spyProfile.capital = 'REDACTED';
  dataKey = "";
  //return to login screen
  state = 'login';
}
