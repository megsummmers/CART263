/**************************************************
Template p5 project
Pippin Barr
Meg Summers

A character creator program based on spider man into the spider verse.
The program will let user's create their own spiderman suit
as well as fill out all information such as their Name, Gender
powers, height etc.

Technologies used:
- Web storage to store suit designs and info
- Annyang to have voice recognition password and control
- responsiveVoice for instructions
- JSON for password randomize
**************************************************/
"use strict";

let state = 'login';
let dataKey;
let userNum = 0;
let tutorialShow = true;
let passwordCheck = false;
let nameKey;
//input boxes variables
let loginInput;
let nameInput;
let genderInput;
let passInput;
let abilityInput;
let heightInput;
//input buttons variables
let loginButton;
let genderButton;
let passButton;
let abilityButton;
let heightButton;
//image variables
let passData;
let imgPBase;
let imgPChestR;
let imgPChestB;
let imgPChestP;
let imgPEyesR;
let imgPEyesB;
let imgPEyesP;
let imgMBase;
let imgMChestR;
let imgMChestB;
let imgMChestP;
let imgMEyesR;
let imgMEyesB;
let imgMEyesP;
let imgGBase;
let imgGHood;
let imgGEyesR;
let imgGEyesB;
let imgGEyesP;
let imgGShoes;
let img1Base;
let img1EyesB;
let img1EyesR;
let img1EyesP;
let img1ChestB;
let img1ChestR;
let img1ChestP;
let imgBlank;
let imgLogo;
let loginBg;
let screenBg;
//what the user chooses
let images = {
  //0=peter, 1=miles, 2=gwen, 3= unique design
  //0-3 red, 4-7 black, 8-11 pink
  base: [],
  chest: [],
  eyes: [],
  extras: [],
  finalSet: []
};

let userPicks = {
  name: "Spiderman",
  password: "REDACTED",
  gender: "TBA",
  height: "TBA",
  ability: "TBA",
  baseNum: 0,
  eyesNum: 0,
  chestNum: 0,
  extrasNum: 0
};

let randomChoices = {
  gender: ["Female", "Male", "Non-binary"],
  ability: ["Electronics", "Ballet", "Robotics", "Gymnastics", "Normal Spider powers"]
};

let arrows = {
  x1: 225, x2: 730,
  y: 300, size: 75
};

let helpButton = {
  r: 30, g: 165, b: 245, alpha: 75,
  circleX: 100, circleY: 600, size: 75,
  textX: 82, textY: 625
};

let editButton = {
  x: 810, y: 590, w: 175, h: 50,
  textX: 745, textY: 600
};

let colorChoice = {
  redR: 240, redG: 55, redB: 55,
  pinkR: 250, pinkG: 125, pinkB: 160,
  black: 50, size: 75, y: 650,
  x1: 375, x2: 500, x3: 625,
  alpha1: 255, alpha2: 0, alpha3: 0
};

let tutorial = {
  bioX: 775, bioY: 600, bioW:200, bioH: 75,
  eyes1x: 775, eyes1y:175, eyes2x: 700, eyes2y: 500,
  eyesw:250, eyesh:100, corner: 5,
  base1x: 200, base1y: 175, base1w: 250, base1h: 100,
  base2x: 750, base2y: 500, base2w: 275, base2h: 85,
  base3x: 250, base3y: 500, base3w: 275, base3h: 85,
  r: 31, g: 165, b: 242, alpha: 150
}

let imagePosition = {
  baseX: 465, baseY: 340, baseW: 375, baseH: 625,
  eyesX: 460, eyesY: 1200,
  chestX: 460, chestY: 900,
  extrasX: 465, extrasY: 340, extrasW: 375, extrasH: 625,
  bioX: 250, bioY: 340, bioW: 375, bioH: 625,
  endX: 250, endY: 340, endW: 375, endH: 625
};

// setup()
function setup() {
  createCanvas(960, 720);
  //annyang voice recognition
  //for password and control
  if (annyang) {
    let commands = {
      'Password is *password': function(password){
        password = password.toLowerCase();
        let data = JSON.parse(localStorage.getItem(nameKey));
        if (password === data.password){
          state = "end";
          setProfile(data);
        } else {
          alert("Incorrect password. Returing back to login page.");
          loginInput.show();
          loginButton.show();
        }
      },
      'Next': changeScreen,
      'Change the colour to *color': changeColor
    };
    //starts annyang
    annyang.addCommands(commands);
    annyang.start();
  } else {
    alert('This game requires speech recognition.');
  }

  //login boxes and button
  loginInput = createInput();
  loginInput.position(325, 300);
  loginInput.size(185, 25);
  loginButton = createButton('GO');
  loginButton.position(525, 300);
  loginButton.size(45, 30);
  //bio input boxes and randomize button
  nameInput = createInput(`${userPicks.name}`);
  nameInput.position(600, 100);
  nameInput.size(300, 25);
  nameInput.hide();
  //password
  passInput = createInput();
  passInput.position(600, 200);
  passInput.size(250, 25);
  passInput.hide();
  passButton = createButton('?');
  passButton.position(875, 200);
  passButton.size(30, 30);
  passButton.hide();
  //gender
  genderInput = createInput();
  genderInput.position(600, 300);
  genderInput.size(250, 25);
  genderInput.hide();
  genderButton = createButton('?');
  genderButton.position(875, 300);
  genderButton.size(30, 30);
  genderButton.hide();
  //power/specialty
  abilityInput = createInput();
  abilityInput.position(600, 400);
  abilityInput.size(250, 25);
  abilityInput.hide();
  abilityButton = createButton('?');
  abilityButton.position(875, 400);
  abilityButton.size(30, 30);
  abilityButton.hide();
  //height
  heightInput = createInput();
  heightInput.position(600, 500);
  heightInput.size(250, 25);
  heightInput.hide();
  heightButton = createButton('?');
  heightButton.position(875, 500);
  heightButton.size(30, 30);
  heightButton.hide();

  //enter images into arrays
  images.base.push(imgPBase);
  images.base.push(imgMBase);
  images.base.push(imgGBase);
  images.base.push(img1Base);
  images.eyes.push(imgPEyesR);
  images.eyes.push(imgMEyesR);
  images.eyes.push(imgGEyesR);
  images.eyes.push(img1EyesR);
  images.eyes.push(imgPEyesB);
  images.eyes.push(imgMEyesB);
  images.eyes.push(imgGEyesB);
  images.eyes.push(img1EyesB);
  images.eyes.push(imgPEyesP);
  images.eyes.push(imgMEyesP);
  images.eyes.push(imgGEyesP);
  images.eyes.push(img1EyesP);
  images.chest.push(imgPChestR);
  images.chest.push(imgMChestR);
  images.chest.push(img1ChestR);
  images.chest.push(imgBlank);
  images.chest.push(imgPChestB);
  images.chest.push(imgMChestB);
  images.chest.push(img1ChestB);
  images.chest.push(imgBlank);
  images.chest.push(imgPChestP);
  images.chest.push(imgMChestP);
  images.chest.push(img1ChestP);
  images.chest.push(imgBlank);
  images.extras.push(imgGHood);
  images.extras.push(imgGShoes);
  images.extras.push(imgBlank);
}

//preload images
function preload(){
  passData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/mythology/monsters.json`);
  imgPBase = loadImage('assets/images/peter-base.png');
  imgPChestB = loadImage('assets/images/peter-spider.png');
  imgPChestP = loadImage('assets/images/peter-spider2.png');
  imgPChestR = loadImage('assets/images/peter-spider3.png');
  imgPEyesB = loadImage('assets/images/peter-eyes.png');
  imgPEyesR = loadImage('assets/images/peter-eyes2.png');
  imgPEyesP = loadImage('assets/images/peter-eyes3.png');
  imgMBase = loadImage('assets/images/miles-base.png');
  imgMChestR = loadImage('assets/images/miles-spider.png');
  imgMChestB = loadImage('assets/images/miles-spider2.png');
  imgMChestP = loadImage('assets/images/miles-spider3.png');
  imgMEyesR = loadImage('assets/images/miles-eyes.png');
  imgMEyesB = loadImage('assets/images/miles-eyes2.png');
  imgMEyesP = loadImage('assets/images/miles-eyes3.png');
  imgGBase = loadImage('assets/images/gwen-base.png');
  imgGHood = loadImage('assets/images/gwen-hood.png');
  imgGEyesP = loadImage('assets/images/gwen-eyes.png');
  imgGEyesR = loadImage('assets/images/gwen-eyes2.png');
  imgGEyesB = loadImage('assets/images/gwen-eyes3.png');
  imgGShoes = loadImage('assets/images/gwen-shoes.png');
  img1Base = loadImage('assets/images/meg-base.PNG');
  img1ChestP = loadImage('assets/images/meg-chest.PNG');
  img1ChestB = loadImage('assets/images/meg-chest2.PNG');
  img1ChestR = loadImage('assets/images/meg-chest3.PNG');
  img1EyesP = loadImage('assets/images/meg-eyes.PNG');
  img1EyesB = loadImage('assets/images/meg-eyes2.PNG');
  img1EyesR = loadImage('assets/images/meg-eyes3.PNG');
  imgBlank = loadImage('assets/images/blank.png');
  imgLogo = loadImage('assets/images/logo.png');
  screenBg = loadImage('assets/images/screen-bg.jpg');
  loginBg = loadImage('assets/images/login-bg.jpg');
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

  if (state != "login" && state != "end"){
    push();
    stroke(255);
    fill(helpButton.r, helpButton.g, helpButton.b, helpButton.alpha);
    ellipse(helpButton.circleX, helpButton.circleY, helpButton.size);
    noStroke();
    fill(255);
    textSize(60);
    text("?", helpButton.textX, helpButton.textY);
    pop();
  }
}

function loginScreen(){
  //button press
  loginButton.mousePressed(checkName);
  if (passwordCheck){
    push();
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text(`Welcome ${nameKey},`, 480, 350);
    textSize(30);
    text('Complete voice recognition password to see and edit your profile\nSay "Password is [your password]"', 480, 400);
    pop();
  } else {
    push();
    imageMode(CENTER);
    image(imgLogo, 480, 575);
    pop();
  }
}

//check if name has data to it
function checkName(){
  nameKey = loginInput.value();
  //check if there is a profile saved
  let data = JSON.parse(localStorage.getItem(nameKey));
  if (data){
    //setProfile(data);
    loginInput.hide();
    loginButton.hide();
    passwordCheck = true;
  } else {
    alert("No profile detected. Creating one now...");
    userPicks.name = nameKey;
    nameInput.value(`${nameKey}`);
    responsiveVoice.speak("Welcome to Spiderman suit creator. To start select your base suit design");
    state = "base";
  }
}

//set profile to loaded data
function setProfile(data){
  userPicks.name = data.name;
  userPicks.password = data.password;
  userPicks.height = data.height;
  userPicks.gender = data.gender;
  userPicks.ability = data.ability;
  userPicks.baseNum = data.baseNum;
  userPicks.eyesNum = data.eyesNum;
  userPicks.chestNum = data.chestNum;
  userPicks.extrasNum = data.extrasNum;
}

//changes screen from
function changeScreen(){
  if (state != "end" && state != "login"){
    if (state === "base"){
      //images.finalSet.push(images.base[userNum]);
      userPicks.baseNum = userNum;
      userNum = 0;
      state = "eyes";
      responsiveVoice.speak("Next select your eye style");
    }  else if (state === "eyes"){
      //images.finalSet.push(images.eyes[userNum]);
      userPicks.eyesNum = userNum;
      userNum = 0;
      //change colour selection back to red
      colorChoice.alpha1 = 255;
      colorChoice.alpha2 = 0;
      colorChoice.alpha3 = 0;
      state = "chest";
      responsiveVoice.speak("Next select your chest style");
    }  else if (state === "chest"){
      //images.finalSet.push(images.chest[userNum]);
      userPicks.chestNum = userNum;
      userNum = 0;
      state = "extras";
      responsiveVoice.speak("Next select any extras you'd like");
    } else if (state === "extras"){
      //images.finalSet.push(images.extras[userNum]);
      userPicks.extrasNum = userNum;
      userNum = 0;
      state = "bio";
      responsiveVoice.speak("Next review your suit profile");
    } else if (state === "bio"){
      //add all the text to profile
      userPicks.name = nameInput.value();
      userPicks.gender = genderInput.value();
      userPicks.height = heightInput.value();
      userPicks.ability = abilityInput.value();
      //save settings in local storage
      localStorage.setItem(userPicks.name, JSON.stringify(userPicks));
      //hide all the input boxes and buttons
      nameInput.hide();
      passInput.hide();
      genderInput.hide();
      heightInput.hide();
      abilityInput.hide();
      passButton.hide();
      genderButton.hide();
      heightButton.hide();
      abilityButton.hide();
      //change to end
      state = "end";
    }
  }
}

function changeColor(userColor){
  let color = userColor.toLowerCase();
  if(state != "login" && state != "end" && state != "base" && state != "bio"){
    if (color === "red"){
      //circle stroke change
      colorChoice.alpha1 = 255;
      colorChoice.alpha2 = 0;
      colorChoice.alpha3 = 0;
      //to red set
      if (userNum >= 0 && userNum <= 3){
        alert("You have already chosen red");
      } else if (userNum >= 4 && userNum <= 7){
        userNum = userNum - 4;
      } else if (userNum >= 8 && userNum <= 11){
        userNum = userNum - 8;
      }
    } else if (color === "black"){
      //circle stroke change
      colorChoice.alpha1 = 0;
      colorChoice.alpha2 = 255;
      colorChoice.alpha3 = 0;
      //to red set
      if (userNum >= 0 && userNum <= 3){
        userNum = userNum + 4;
      } else if (userNum >= 4 && userNum <= 7){
        alert("You have already chosen black");
      } else if (userNum >= 8 && userNum <= 11){
        userNum = userNum - 4;
      }
    } else if (color === "pink"){
      //circle stroke change
      colorChoice.alpha1 = 0;
      colorChoice.alpha2 = 0;
      colorChoice.alpha3 = 255;
      //to red set
      if (userNum >= 0 && userNum <= 3){
        userNum = userNum + 8;
      } else if (userNum >= 4 && userNum <= 7){
        userNum = userNum + 4;
      } else if (userNum >= 8 && userNum <= 11){
        alert("You have already chosen pink");
      }
    } else {
      alert("Color is not available");
    }
  }
}

function mousePressed(){
  //distance from mouse to each arrow button
  let dL = dist(mouseX, mouseY, arrows.x1, arrows.y);
  let dR = dist(mouseX, mouseY, arrows.x2, arrows.y);
  //left button press
  if (dL <= arrows.size/2 && state != "login" && state != "end"){
    if(userNum != 0 && userNum != 4 && userNum != 8){
      //updates which base is chosen
      userNum--;
    }
  } else if (dR <= arrows.size/2 && state != "login" && state != "end"){
    if(userNum != 3 && userNum != 7 && userNum != 11){
      //updates which base is chosen
      userNum++;
    }
  }
  //instructions button
  let dT = dist(mouseX, mouseY, helpButton.circleX, helpButton.circleY);
  if (dT <= helpButton.size/2 && state != "login" && state != "end"){
    if (tutorialShow){
      tutorialShow = false;
    } else if (!tutorialShow){
      tutorialShow = true;
    }
  }
  //edit button
  if (editButton.x + editButton.w/2 >= mouseX &&
    editButton.x <= mouseX + editButton.w/2 &&
    editButton.y + editButton.h/2 >= mouseY &&
    editButton.y <= mouseY + editButton.h/2 &&
    state === "end"){
      state = "base";
      for (let i = 0; i <= images.finalSet.length; i++){
        images.finalSet.pop();
      }
    }
}

//all customize screen display
function baseDisplay(){
  //display
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
  //tutorial/instructions
  if (tutorialShow){
    push();
    stroke(255);
    fill(tutorial.r, tutorial.g, tutorial.b, tutorial.alpha);
    rectMode(CENTER);
    rect(tutorial.base1x, tutorial.base1y, tutorial.base1w, tutorial.base1h, tutorial.corner);
    rect(tutorial.base2x, tutorial.base2y, tutorial.base2w, tutorial.base2h, tutorial.corner);
    rect(tutorial.base3x, tutorial.base3y, tutorial.base3w, tutorial.base3h, tutorial.corner);
    noStroke();
    textAlign(CENTER);
    textSize(18);
    fill(255);
    text("Use these arrows to\nmove between the different\noptions for each category", tutorial.base1x, tutorial.base1y - 15);
    text('Say "Next" when your done\nto continue to the next category', tutorial.base2x, tutorial.base2y - 5);
    text("Use this button to hide/show\nall the instructions.", tutorial.base3x, tutorial.base3y);
    pop();
  }
}

function eyesDisplay(){
  //display
  push();
  imageMode(CENTER);
  image(images.base[userPicks.baseNum], imagePosition.eyesX, imagePosition.eyesY);
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

  //color select
  strokeWeight(3);
  stroke(255, 255, 255, colorChoice.alpha1);
  fill(colorChoice.redR, colorChoice.redG, colorChoice.redB);
  ellipse(colorChoice.x1, colorChoice.y, colorChoice.size);
  stroke(255, 255, 255, colorChoice.alpha2);
  fill(colorChoice.black, colorChoice.black, colorChoice.black);
  ellipse(colorChoice.x2, colorChoice.y, colorChoice.size);
  stroke(255, 255, 255, colorChoice.alpha3);
  fill(colorChoice.pinkR, colorChoice.pinkG, colorChoice.pinkB);
  ellipse(colorChoice.x3, colorChoice.y, colorChoice.size);
  pop();
  //tutorial section
  if (tutorialShow){
    push();
    stroke(255);
    fill(tutorial.r, tutorial.g, tutorial.b, tutorial.alpha);
    rectMode(CENTER);
    rect(tutorial.eyes1x, tutorial.eyes1y, tutorial.eyesw, tutorial.eyesh, tutorial.corner);
    rect(tutorial.eyes2x, tutorial.eyes2y, tutorial.eyesw, tutorial.eyesh, tutorial.corner);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(18);
    text('To change the colour of\nthe eyes or chest say\n"Change the colour to __"', tutorial.eyes1x, tutorial.eyes1y - 15);
    text('The colour options will\n be listed here, the selected\n on will be highlighted', tutorial.eyes2x, tutorial.eyes2y - 15);
    pop();
  }
}

function chestDisplay(){
  push();
  imageMode(CENTER);
  image(images.base[userPicks.baseNum], imagePosition.chestX, imagePosition.chestY);
  image(images.eyes[userPicks.eyesNum], imagePosition.chestX, imagePosition.chestY);
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

  //color choose
  strokeWeight(3);
  stroke(255, 255, 255, colorChoice.alpha1);
  fill(colorChoice.redR, colorChoice.redG, colorChoice.redB);
  ellipse(colorChoice.x1, colorChoice.y, colorChoice.size);
  stroke(255, 255, 255, colorChoice.alpha2);
  fill(colorChoice.black, colorChoice.black, colorChoice.black);
  ellipse(colorChoice.x2, colorChoice.y, colorChoice.size);
  stroke(255, 255, 255, colorChoice.alpha3);
  fill(colorChoice.pinkR, colorChoice.pinkG, colorChoice.pinkB);
  ellipse(colorChoice.x3, colorChoice.y, colorChoice.size);
  pop();
}

function extraDisplay(){
  push();
  imageMode(CENTER);
  image(images.base[userPicks.baseNum], imagePosition.extrasX, imagePosition.extrasY, imagePosition.extrasW, imagePosition.extrasH);
  image(images.eyes[userPicks.eyesNum], imagePosition.extrasX, imagePosition.extrasY, imagePosition.extrasW, imagePosition.extrasH);
  image(images.chest[userPicks.chestNum], imagePosition.extrasX, imagePosition.extrasY, imagePosition.extrasW, imagePosition.extrasH);
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
  passInput.show();
  heightInput.show();
  abilityInput.show();
  genderButton.show();
  passButton.show();
  heightButton.show();
  abilityButton.show();
  //set value to previous inputs
  genderInput.value(`${userPicks.gender}`);
  passInput.value(`${userPicks.password}`);
  heightInput.value(`${userPicks.height}`);
  abilityInput.value(`${userPicks.ability}`);
  //randomize option for all categories
  passButton.mousePressed(function(){
    let pass = random(passData.names);
    userPicks.password = pass;
    passInput.value(`${pass}`);
  });
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
  abilityButton.mousePressed(function(){
    let ability = random(randomChoices.ability);
    userPicks.ability = ability;
    abilityInput.value(`${ability}`);
  });
  //display
  push();
  imageMode(CENTER);
  image(images.base[userPicks.baseNum], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  image(images.eyes[userPicks.eyesNum], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  image(images.chest[userPicks.chestNum], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  image(images.extras[userPicks.extrasNum], imagePosition.bioX, imagePosition.bioY, imagePosition.bioW, imagePosition.bioH);
  stroke(255);
  fill(235, 44, 30, 150);
  textAlign(CENTER);
  noStroke();
  fill(255);
  textSize(25);
  text("Name:", 540, 125);
  text("Password:", 515, 225);
  text("Gender:", 530, 325);
  text("Ability:", 535, 425);
  text("Height:", 535, 525);
  pop();

  //tutorial section
  if (tutorialShow){
    push();
    stroke(255);
    fill(tutorial.r, tutorial.g, tutorial.b, tutorial.alpha);
    rectMode(CENTER);
    rect(tutorial.bioX, tutorial.bioY, tutorial.bioW, tutorial.bioH, tutorial.corner);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(18);
    text('Use these "?" buttons\nto randomize the info', tutorial.bioX, tutorial.bioY - 10);
    pop();
  }
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
  text(`Welcome ${userPicks.name},`, 445, 175);
  textSize(25);
  text("Here is your suit information:", 450, 225);
  text(`Password: ${userPicks.password}`, 500, 300);
  text(`Gender: ${userPicks.gender}`, 525, 375);
  text(`Ability: ${userPicks.ability}`, 540, 450);
  text(`Height: ${userPicks.height}`, 535, 525);
  stroke(255);
  rectMode(CENTER);
  fill(helpButton.r, helpButton.g, helpButton.b, 75);
  rect(editButton.x, editButton.y, editButton.w, editButton.h, 5);
  noStroke();
  fill(255);
  textSize(25);
  text("Edit choices", editButton.textX, editButton.textY);
  pop();
}
