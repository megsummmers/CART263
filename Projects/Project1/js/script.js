/**************************************************
Template p5 project
Pippin Barr
Meg Summers

A character creator program based on spider man into the spider verse.
The program will let user's create their own version of spiderman
as well as fill out all information such as their backstory,
powers, name etc. The program will also include (limited)
visual customization includeing creating their own spiderman suit.

Technologies to be used
- Web storage to store their character settings and
  create multiple characters.
-
**************************************************/
"use strict";

let state = 'login';
let dataKey;
let userNum = 0;
//input boxes variables
let loginInput;
let nameInput;
let genderInput;
let powerInput;
let heightInput;
//input buttons variables
let loginButton;
let genderButton;
let powerButton;
let heightButton;
//image variables
let imgPBase;
let imgPChest;
let imgPEyes;
let imgMBase;
let imgMChest;
let imgMEyes;
let imgGBase;
let imgGHood;
let imgGEyes;
let imgGShoes;
let imgBlank;
let loginBg;
let screenBg;
//what the user chooses
let images = {
  //0=peter, 1=miles, 2=gwen
  base: [],
  chest: [],
  eyes: [],
  extras: [],
  finalSet: []
};

let userPicks = {
  name: "Spiderman",
  height: "TBA",
  gender: "TBA",
  power: "TBA",
  baseNum: 0,
  eyesNum: 0,
  chestNum: 0,
  extrasNum: 0
};

let randomChoices = {
  gender: ["Female", "Male", "Non-binary"],
  powers: ["Electronics", "Ballet", "Robotics", "Gymnastics", "Normal Spider powers"]
};

let arrows = {
  x1: 225, x2: 730,
  y: 300, size: 75
};

let confirmButton = {
  x: 750, y: 600,
  w: 200, h: 50
};

let imagePosition = {
  baseX: 465, baseY: 340, baseW: 375, baseH: 625,
  eyesX: 460, eyesY: 1200,
  chestX: 460, chestY: 900,
  extrasX: 465, extrasY: 340, extrasW: 375, extrasH: 625,
  bioX: 200, bioY: 340, bioW: 375, bioH: 625,
  endX: 200, endY: 340, endW: 375, endH: 625
};

// setup()
function setup() {
  createCanvas(960, 720);

  //annyang voice recognition
  //for password and control
  if (annyang) {
    let commands = {
      'Next': changeScreen
    };
    //starts annyang
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('This game requires speech recognition.');
  }

  //login box and button
  loginInput = createInput();
  loginInput.position(480, 480);
  loginButton = createButton('>');
  loginButton.position(620, 480);
  //bio input boxes and randomize button
  nameInput = createInput(`${userPicks.name}`);
  nameInput.position(640, 225);
  nameInput.size(300, 25);
  nameInput.hide();
  //gender
  genderInput = createInput();
  genderInput.position(640, 325);
  genderInput.size(250, 25);
  genderInput.hide();
  genderButton = createButton('?');
  genderButton.position(910, 325);
  genderButton.size(30, 30);
  genderButton.hide();
  //power/specialty
  powerInput = createInput();
  powerInput.position(640, 425);
  powerInput.size(250, 25);
  powerInput.hide();
  powerButton = createButton('?');
  powerButton.position(910, 425);
  powerButton.size(30, 30);
  powerButton.hide();
  //height
  heightInput = createInput();
  heightInput.position(640, 325);
  heightInput.size(250, 25);
  heightInput.hide();
  heightButton = createButton('?');
  heightButton.position(910, 325);
  heightButton.size(30, 30);
  heightButton.hide();

  //enter images into arrays
  images.base.push(imgPBase);
  images.base.push(imgMBase);
  images.base.push(imgGBase);
  images.eyes.push(imgPEyes);
  images.eyes.push(imgMEyes);
  images.eyes.push(imgGEyes);
  images.chest.push(imgPChest);
  images.chest.push(imgMChest);
  images.chest.push(imgBlank);
  images.extras.push(imgGHood);
  images.extras.push(imgGShoes);
  images.extras.push(imgBlank);
  //temporary
  //localStorage.removeItem("Spooderman");
  // images.finalSet.push(imgPBase);
  // images.finalSet.push(imgPEyes);
  // images.finalSet.push(imgPChest);
  // images.finalSet.push(imgBlank);
}

//preload images
function preload(){
  imgPBase = loadImage('assets/images/peter-base.png');
  imgPChest = loadImage('assets/images/peter-spider.png');
  imgPEyes = loadImage('assets/images/peter-eyes.png');
  imgMBase = loadImage('assets/images/miles-base.png');
  imgMChest = loadImage('assets/images/miles-spider.png');
  imgMEyes = loadImage('assets/images/miles-eyes.png');
  imgGBase = loadImage('assets/images/gwen-base.png');
  imgGHood = loadImage('assets/images/gwen-hood.png');
  imgGEyes = loadImage('assets/images/gwen-eyes.png');
  imgGShoes = loadImage('assets/images/gwen-shoes.png');
  imgBlank = loadImage('assets/images/blank.png');
  screenBg = loadImage('assets/images/screen-bg.jpg');
  loginBg = loadImage('assets/images/login-bg.png');
}

// draw()
function draw() {
  //control which screen is displayed
  if(state === 'login'){
    background(loginBg);
    loginScreen();
  } else {
    background(screenBg);
    //hides the login button and box
    loginInput.hide();
    loginButton.hide();
  }
  if (state === 'base'){
    baseDisplay();
  } else if (state === 'eyes'){
    eyesDisplay();
  } else if (state === 'chest'){
    chestDisplay();
  } else if (state === 'extras'){
    extraDisplay();
  } else if (state === 'bio'){
    bioDisplay();
  } else if (state === 'end'){
    endScreen();
  }
}

function loginScreen(){
  //button press
  loginButton.mousePressed(checkName);
}
//check if name has data to it
function checkName(){
  let name = loginInput.value();
  //check if there is a profile saved
  let data = JSON.parse(localStorage.getItem(name));
  if (data){
    alert(`Bringing you to your profile ${name}`);
    setProfile(data);
    state = "end";
  } else {
    alert("No profile detected. Creating one now...");
    userPicks.name = name;
    nameInput.value(`${name}`);
    state = "base";
  }
}
//set profile to loaded data
function setProfile(data){
  userPicks.name = data.name;
  userPicks.height = data.height;
  userPicks.gender = data.gender;
  userPicks.power = data.power;
  userPicks.baseNum = data.baseNum;
  userPicks.eyesNum = data.eyesNum;
  userPicks.chestNum = data.chestNum;
  userPicks.extrasNum = data.extrasNum;
}

function changeScreen(){
  if (state != "end" && state != "login"){
    if (state === "base"){
      images.finalSet.push(images.base[userNum]);
      userPicks.baseNum = userNum;
      userNum = 0;
      state = "eyes";
      //responsiveVoice.speak("Please select your eye style");
    }  else if (state === "eyes"){
      images.finalSet.push(images.eyes[userNum]);
      userPicks.eyesNum = userNum;
      userNum = 0;
      state = "chest";
      //responsiveVoice.speak("Please select your chest style");
    }  else if (state === "chest"){
      images.finalSet.push(images.chest[userNum]);
      userPicks.chestNum = userNum;
      userNum = 0;
      state = "extras";
      //responsiveVoice.speak("Please select any extras you'd like");
    } else if (state === "extras"){
      images.finalSet.push(images.extras[userNum]);
      userPicks.extrasNum = userNum;
      userNum = 0;
      state = "bio";
      //responsiveVoice.speak("Please review your suit profile");
    } else if (state === "bio"){
      //add all the text to profile
      userPicks.name = nameInput.value();
      userPicks.gender = genderInput.value();
      userPicks.height = heightInput.value();
      userPicks.power = powerInput.value();
      //save settings in local storage
      localStorage.setItem(userPicks.name, JSON.stringify(userPicks));
      //hide all the input boxes and buttons
      nameInput.hide();
      genderInput.hide();
      heightInput.hide();
      powerInput.hide();
      genderButton.hide();
      heightButton.hide();
      powerButton.hide();
      //change to end
      state = "end";
    }
  }
}

function mousePressed(){
  //distance from mouse to each arrow button
  let dL = dist(mouseX, mouseY, arrows.x1, arrows.y);
  let dR = dist(mouseX, mouseY, arrows.x2, arrows.y);
  //left button press
  if (dL <= arrows.size/2 && state != "login" && state != "end"){
    if(userNum > 0){
      //updates which base is chosen
      userNum--;
    }
  } else if (dR <= arrows.size/2 && state != "login" && state != "end"){
    if(userNum < 2){
      //updates which base is chosen
      userNum++;
    }
  }
}

function baseDisplay(){
  push();
  imageMode(CENTER);
  image(images.base[userNum], imagePosition.baseX, imagePosition.baseY, imagePosition.baseW, imagePosition.baseH);
  stroke(255);
  fill(235, 44, 30, 150);
  ellipse(arrows.x1, arrows.y, arrows.size);
  ellipse(arrows.x2, arrows.y, arrows.size);
  textSize(40);
  textAlign(CENTER);
  noStroke();
  fill(255);
  text("<", arrows.x1, arrows.y +10);
  text(">", arrows.x2, arrows.y +10);
  pop();
}

function eyesDisplay(){
  push();
  imageMode(CENTER);
  image(images.finalSet[0], imagePosition.eyesX, imagePosition.eyesY);
  image(images.eyes[userNum], imagePosition.eyesX, imagePosition.eyesY);
  stroke(255);
  fill(235, 44, 30, 150);
  ellipse(arrows.x1, arrows.y, arrows.size);
  ellipse(arrows.x2, arrows.y, arrows.size);
  textSize(40);
  textAlign(CENTER);
  noStroke();
  fill(255);
  text("<", arrows.x1, arrows.y +10);
  text(">", arrows.x2, arrows.y +10);
  pop();
}

function chestDisplay(){
  push();
  imageMode(CENTER);
  image(images.finalSet[0], imagePosition.chestX, imagePosition.chestY);
  image(images.finalSet[1], imagePosition.chestX, imagePosition.chestY);
  image(images.chest[userNum], imagePosition.chestX, imagePosition.chestY);
  stroke(255);
  fill(235, 44, 30, 150);
  ellipse(arrows.x1, arrows.y, arrows.size);
  ellipse(arrows.x2, arrows.y, arrows.size);
  textSize(40);
  textAlign(CENTER);
  noStroke();
  fill(255);
  text("<", arrows.x1, arrows.y +10);
  text(">", arrows.x2, arrows.y +10);
  pop();
}

function extraDisplay(){
  push();
  imageMode(CENTER);
  image(images.finalSet[0], imagePosition.extrasX, imagePosition.extrasY, imagePosition.extrasW, imagePosition.extrasH);
  image(images.finalSet[1], imagePosition.extrasX, imagePosition.extrasY, imagePosition.extrasW, imagePosition.extrasH);
  image(images.finalSet[2], imagePosition.extrasX, imagePosition.extrasY, imagePosition.extrasW, imagePosition.extrasH);
  image(images.extras[userNum], imagePosition.extrasX, imagePosition.extrasY, imagePosition.extrasW, imagePosition.extrasH);
  stroke(255);
  fill(235, 44, 30, 150);
  ellipse(arrows.x1, arrows.y, arrows.size);
  ellipse(arrows.x2, arrows.y, arrows.size);
  textSize(40);
  textAlign(CENTER);
  noStroke();
  fill(255);
  text("<", arrows.x1, arrows.y +10);
  text(">", arrows.x2, arrows.y +10);
  pop();
}

function bioDisplay(){
  //show the boxes
  nameInput.show();
  genderInput.show();
  heightInput.show();
  powerInput.show();
  genderButton.show();
  heightButton.show();
  powerButton.show();
  //randomize option for all categories
  genderButton.mousePressed(function(){
    let gender = random(randomChoices.gender);
    userPicks.gender = gender;
    genderInput.value(`${gender} style`);
  });
  heightButton.mousePressed(function(){
    let height = round(random(150, 210));
    userPicks.height = height;
    heightInput.value(`${height} cm`);
  });
  powerButton.mousePressed(function(){
    let powers = random(randomChoices.powers);
    userPicks.power = powers;
    powerInput.value(`${powers}`);
  });
  //display
  push();
  imageMode(CENTER);
  image(images.finalSet[0], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  image(images.finalSet[1], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  image(images.finalSet[2], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  image(images.finalSet[3], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  stroke(255);
  fill(235, 44, 30, 150);
  textAlign(CENTER);
  noStroke();
  fill(255);
  textSize(25);
  text("Name:", 540, 125);
  text("Gender:", 530, 225);
  text("Height:", 530, 325);
  pop();
}

function endScreen(){
  //display
  push();
  imageMode(CENTER);
  image(images.base[userPicks.baseNum], imagePosition.endX, imagePosition.endY, imagePosition.endW, imagePosition.endH);
  image(images.eyes[userPicks.eyesNum], imagePosition.endX, imagePosition.endY, imagePosition.endW, imagePosition.endH);
  image(images.chest[userPicks.chestNum], imagePosition.endX, imagePosition.endY, imagePosition.endW, imagePosition.endH);
  image(images.extras[userPicks.extrasNum], imagePosition.endX, imagePosition.endY, imagePosition.endW, imagePosition.endH);
  fill(255);
  textAlign(LEFT);
  textSize(40);
  text(`Welcome ${userPicks.name}`, 400, 150);
  textSize(25);
  text(`Gender: ${userPicks.gender}`, 510, 250);
  text(`Height: ${userPicks.height}`, 510, 325);
  text(`Power/specialty: ${userPicks.power}`, 425, 400);
  pop();
}
