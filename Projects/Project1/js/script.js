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
- annyang to ahve voice recognition password
- responsiveVoice for instructions
**************************************************/
"use strict";

let state = 'login';
let dataKey;
let userNum = 0;
let tutorial = true;
//input boxes variables
let loginInput;
let nameInput;
let genderInput;
let passInput;
let powerInput;
let heightInput;
//input buttons variables
let loginButton;
let genderButton;
let passButton;
let powerButton;
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
let imgBlank;
let loginBg;
let screenBg;
//what the user chooses
let images = {
  //0=peter, 1=miles, 2=gwen
  //0-2 red, 3-5 black, 6-8 pink
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

let helpButton = {
  r: 30, g: 165, b: 245, alpha: 75,
  circleX: 100, circleY: 600, size: 75,
  textX: 82, textY: 625
};

let colorChoice = {
  redR: 240, redG: 55, redB: 55,
  pinkR: 250, pinkG: 125, pinkB: 160,
  black: 50, size: 75, y: 650,
  x1: 375, x2: 500, x3: 625,
  alpha1: 255, alpha2: 0, alpha3: 0
};

let imagePosition = {
  baseX: 465, baseY: 340, baseW: 375, baseH: 625,
  eyesX: 460, eyesY: 1200,
  chestX: 460, chestY: 900,
  extrasX: 465, extrasY: 340, extrasW: 375, extrasH: 625,
  bioX: 250, bioY: 340, bioW: 375, bioH: 625,
  endX: 200, endY: 340, endW: 375, endH: 625
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
        if (password === userPicks.password){
          state = "end";
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
  loginInput.position(400, 480);
  loginButton = createButton('>');
  loginButton.position(540, 480);
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
  powerInput = createInput();
  powerInput.position(600, 400);
  powerInput.size(250, 25);
  powerInput.hide();
  powerButton = createButton('?');
  powerButton.position(875, 400);
  powerButton.size(30, 30);
  powerButton.hide();
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
  images.eyes.push(imgPEyesR);
  images.eyes.push(imgMEyesR);
  images.eyes.push(imgGEyesR);
  images.eyes.push(imgPEyesB);
  images.eyes.push(imgMEyesB);
  images.eyes.push(imgGEyesB);
  images.eyes.push(imgPEyesP);
  images.eyes.push(imgMEyesP);
  images.eyes.push(imgGEyesP);
  images.chest.push(imgPChestR);
  images.chest.push(imgMChestR);
  images.chest.push(imgBlank);
  images.chest.push(imgPChestB);
  images.chest.push(imgMChestB);
  images.chest.push(imgBlank);
  images.chest.push(imgPChestP);
  images.chest.push(imgMChestP);
  images.chest.push(imgBlank);
  images.extras.push(imgGHood);
  images.extras.push(imgGShoes);
  images.extras.push(imgBlank);

  //temporary
  //localStorage.removeItem("Spiderman");
  // images.finalSet.push(imgPBase);
  // images.finalSet.push(imgPEyesB);
  // images.finalSet.push(imgPChestB);
  // images.finalSet.push(imgBlank);
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
}

//check if name has data to it
function checkName(){
  let name = loginInput.value();
  //check if there is a profile saved
  let data = JSON.parse(localStorage.getItem(name));
  if (data){
    alert(`Say "Password is [your password]" to go to your profile, ${name}`);
    setProfile(data);
    loginInput.hide();
    loginButton.hide();
  } else {
    alert("No profile detected. Creating one now...");
    userPicks.name = name;
    nameInput.value(`${name}`);
    responsiveVoice.speak("To start select your base suit");
    state = "base";
  }
}

//set profile to loaded data
function setProfile(data){
  userPicks.name = data.name;
  userPicks.password = data.password;
  userPicks.height = data.height;
  userPicks.gender = data.gender;
  userPicks.power = data.power;
  userPicks.baseNum = data.baseNum;
  userPicks.eyesNum = data.eyesNum;
  userPicks.chestNum = data.chestNum;
  userPicks.extrasNum = data.extrasNum;
}

//changes screen from
function changeScreen(){
  if (state != "end" && state != "login"){
    if (state === "base"){
      images.finalSet.push(images.base[userNum]);
      userPicks.baseNum = userNum;
      userNum = 0;
      state = "eyes";
      responsiveVoice.speak("Next select your eye style");
    }  else if (state === "eyes"){
      images.finalSet.push(images.eyes[userNum]);
      userPicks.eyesNum = userNum;
      userNum = 0;
      state = "chest";
      responsiveVoice.speak("Next select your chest style");
    }  else if (state === "chest"){
      images.finalSet.push(images.chest[userNum]);
      userPicks.chestNum = userNum;
      userNum = 0;
      state = "extras";
      responsiveVoice.speak("Next select any extras you'd like");
    } else if (state === "extras"){
      images.finalSet.push(images.extras[userNum]);
      userPicks.extrasNum = userNum;
      userNum = 0;
      state = "bio";
      responsiveVoice.speak("Next review your suit profile");
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
      passInput.hide();
      genderInput.hide();
      heightInput.hide();
      powerInput.hide();
      passButton.hide();
      genderButton.hide();
      heightButton.hide();
      powerButton.hide();
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
      if (userNum >= 0 && userNum <= 2){
        alert("You have already chosen red");
      } else if (userNum >= 3 && userNum <= 5){
        userNum = userNum - 3;
      } else if (userNum >= 6 && userNum <= 8){
        userNum = userNum - 6;
      }
    } else if (color === "black"){
      //circle stroke change
      colorChoice.alpha1 = 0;
      colorChoice.alpha2 = 255;
      colorChoice.alpha3 = 0;
      //to red set
      if (userNum >= 0 && userNum <= 2){
        userNum = userNum + 3;
      } else if (userNum >= 3 && userNum <= 5){
        alert("You have already chosen black");
      } else if (userNum >= 6 && userNum <= 8){
        userNum = userNum - 3;
      }
    } else if (color === "pink"){
      //circle stroke change
      colorChoice.alpha1 = 0;
      colorChoice.alpha2 = 0;
      colorChoice.alpha3 = 255;
      //to red set
      if (userNum >= 0 && userNum <= 2){
        userNum = userNum + 6;
      } else if (userNum >= 3 && userNum <= 5){
        userNum = userNum + 3;
      } else if (userNum >= 6 && userNum <= 8){
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
    if(userNum != 0 && userNum != 3 && userNum != 6){
      //updates which base is chosen
      userNum--;
    }
  } else if (dR <= arrows.size/2 && state != "login" && state != "end"){
    if(userNum != 2 && userNum != 5 && userNum != 8){
      //updates which base is chosen
      userNum++;
    }
  }
  //instructions button
  let dT = dist(mouseX, mouseY, helpButton.circleX, helpButton.circleY);
  if (dT <= helpButton.size/2 && state != "login" && state != "end"){
    if (tutorial){
      tutorial = false;
    } else if (!tutorial){
      tutorial = true;
    }
  }
}

//all customize screen display
function baseDisplay(){
  //tutorial/instructions
  if (tutorial){
    push();
    stroke(255);
    fill(31, 165, 242, 100);//blue color
    rectMode(CENTER);
    rect(200, 175, 250, 100, 5);
    rect(750, 500, 275, 85, 5);
    rect(helpButton.circleX + 150, helpButton.circleY - 100, 275, 85, 5);
    fill(255);
    strokeWeight(2);
    line(helpButton.circleX + 25, helpButton.circleY - 25, helpButton.circleX + 125, helpButton.circleY - 57);
    ellipse(helpButton.circleX + 25, helpButton.circleY - 25, 10);
    noStroke();
    textAlign(CENTER);
    textSize(18);
    text("Use these arrows to\nmove between the different\noptions for each category", 200, 160);
    text('Say "Next" when your done\nto continue to the next category', 750, 490);
    text("Use this button to hide/show\nall the instructions.", helpButton.circleX + 150, helpButton.circleY - 100);
    pop();
  }
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
}

function eyesDisplay(){
  //display
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

  //tutorial section
  if (tutorial){
    push();
    stroke(255);
    fill(31, 165, 242, 100);//blue color
    rectMode(CENTER);
    rect(775, 175, 250, 100, 5);
    rect(700, 500, 250, 100, 5);
    fill(255);
    strokeWeight(2);
    line(700, 550, 625, 650);
    ellipse(625, 650, 10);
    noStroke();
    textAlign(CENTER);
    textSize(18);
    text('To change the colour of\nthe eyes or chest say\n"Change the colour to __"', 775, 160);
    text('The colour options will\n be listed here, the selected\n on will be highlighted', 700, 485);
    pop();
  }
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
  passInput.show();
  heightInput.show();
  powerInput.show();
  genderButton.show();
  passButton.show();
  heightButton.show();
  powerButton.show();
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
  text("Password:", 515, 225);
  text("Gender:", 530, 325);
  text("Power:", 535, 425);
  text("Height:", 535, 525);
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
  text(`Welcome ${userPicks.name}`, 450, 150);
  textSize(25);
  text(`Password: ${userPicks.password}`, 450, 225);
  text(`Gender: ${userPicks.gender}`, 475, 300);
  text(`Ability: ${userPicks.power}`, 490, 375);
  text(`Height: ${userPicks.height}`, 485, 450);
  pop();
}
