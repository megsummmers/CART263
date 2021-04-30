/**
Murder Mystery game
Margaret Summers

A mystery game where you find clues and play minigames to
try and find out which of the suspects murdered the victim!
*/

"use strict";

//variables
let currentRoom = "travel";
let roundNum = 1;
let id = 1;
let scene = "search";
let interviewDone = false;
let noteDone = false;
let mixedWords = 10;
let treasuresSorted = 0;
let decipherTutorial = false;
let scheduleOrder = ["4", "2", "1", "5", "3", "6"];
let scheduleScore = 6;
let notepadStatus = "open";
let fingerprintCode = 0;
//final checklist
let shaneInt = false;
let danielleInt = false;
let carolineInt = false;
let scheduleGame = false;
let noteGame = false;
let treasureGame = false;
let phoneGame = false;
let finalSuspect;
let finalWeapon;

//------------- CHANGE LOCATIONS ------------
function changeRoom(nextRoom){
  if (nextRoom === "office"){
    $(`.mainHall`).css("display", "none");
    $(`.notepad`).css("display", "none");
    $(`.notes`).css("display", "none");
    $(`.office`).css("display", "block");
    $(`#returnButton1`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/office.png")');
    currentRoom = "office";
  } else if (nextRoom === "treasure"){
    $(`.mainHall`).css("display", "none");
    $(`.notepad`).css("display", "none");
    $(`.notes`).css("display", "none");
    $(`.treasure`).css("display", "block");
    $(`#returnButton2`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/treasure.png")');
    currentRoom = "treasure";
  } else if (nextRoom === "bedroom"){
    $(`.mainHall`).css("display", "none");
    $(`.notepad`).css("display", "none");
    $(`.notes`).css("display", "none");
    $(`.bedroom`).css("display", "block");
    $(`#returnButton3`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/bedroom.png")');
    currentRoom = "bedroom";
  } else if (nextRoom === "main"){
    notepadUpdate();
    $(`.mainHall`).css("display", "flex");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    $(`.office`).css("display", "none");
    $(`.treasure`).css("display", "none");
    $(`.bedroom`).css("display", "none");
    $(`.notepad`).css("display", "block");
    $(`.notes`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/main-hall.png")');
    currentRoom = "travel";
  }
}

//-------------- Notepad ------------------------

$(`#notepadOpen`).click(function(){
    $(`.open`).css("display", "none");
    $(`.closed`).css("display", "block");
});

$(`#notepadClosed`).click(function(){
  $(`.open`).css("display", "block");
  $(`.closed`).css("display", "none");
});

//updates text on the notpad based on which room you came from
function notepadUpdate(){
  if (currentRoom === "office"){
    $(`#note1`).html("Office Notes:");
    $(`#note2`).html("-Interviewed 1/3 suspects");
    $(`#note3`).html("-Found 0/2 possible murder weapons");
    $(`#note4`).html("-Found out Office was not the murder scene");
    $(`#note5`).html(" ");
    $(`#note6`).html("Next I should go to the treasure room");
    $(`#note7`).html(" ");
    $(`#note8`).html(" ");
  } else if (currentRoom === "treasure"){
    $(`#note1`).html("Treasure Room Notes:");
    $(`#note2`).html("-Interviewed 2/3 suspects");
    $(`#note3`).html("-Found 2/2 possible murder weapons");
    $(`#note4`).html("Victim was killed with either a shard of");
    $(`#note5`).html("glass or pair of gold knuckles");
    $(`#note6`).html("-Found out victim was killed in treasure");
    $(`#note7`).html("room");
    $(`#note8`).html("Lastly I should go checkout the bedroom");
  } else if (currentRoom === "bedroom"){
    $(`#note1`).html("Bedroom Notes:");
    $(`#note2`).html("-Interviewed all suspects");
    $(`#note3`).html("Victim was killed in treasure room with either");
    $(`#note4`).html("a shard of glass or pair of gold knuckles");
    $(`#note5`).html("Danielle was intoxicated the entire night");
    $(`#note6`).html("");
    $(`#note7`).html("Time to make a decision");
    $(`#note8`).html(" ");
    $(`#noteButton`).css("display", "block");
  }
}

//------------- Change scene ---------------
//changes between different scenes within a room
function changeScene(currentScene){
  scene = currentScene;
  if (scene === "tutorial"){
    $(`.tutorial`).css("display", "none");
    $(`.travelscene`).css("display", "flex");
    $(`.notepad`).css("display", "block");
    $(`.notes`).css("display", "block");
  } else if (scene === "interview"){
    $(`.search`).css("display", "none");
    $(`.decipher`).css("display", "none");
    $(`.interview`).css("display", "block");
  } else if (scene === "office"){
    $(`.decipher`).css("display", "none");
    $(`.schedule`).css("display", "none");
    $(`.interview`).css("display", "none");
    $(`.search`).css("display", "block");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    $(`body`).css('background-image', 'url("css/images/office.png")');
  } else if (scene === "bedroom"){
    $(`.phone`).css("display", "none");
    $(`.interview`).css("display", "none");
    $(`.search`).css("display", "block");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    $(`body`).css('background-image', 'url("css/images/bedroom.png")');
  } else if (scene === "decipherT"){
    $(`.search`).css("display", "none");
    $(`.decipher`).css("display", "block");
    $(`.interview`).css("display", "none");
    $(`#tutorial`).css("display", "block");
    decipherTutorial = true;
  } else if (scene === "decipher"){
    $(`.search`).css("display", "none");
    $(`.decipher`).css("display", "block");
    $(`.interview`).css("display", "none");
    $(`#tutorial`).css("display", "none");
    $(`#main`).css("display", "block");
  } else if (scene === "schedule"){
    $(`.search`).css("display", "none");
    $(`.schedule`).css("display", "block");
    $(`.interview`).css("display", "none");
  } else if (scene === "treasure"){
    $(`.treasureSort`).css("display", "none");
    $(`.glassPuzzle`).css("display", "none");
    $(`.interview`).css("display", "none");
    $(`.search`).css("display", "block");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    $(`body`).css('background-image', 'url("css/images/treasure.png")');
  } else if (scene === "treasureSort"){
    $(`.search`).css("display", "none");
    $(`.treasureSort`).css("display", "block");
    $(`.interview`).css("display", "none");
    $(`body`).css('background-image', 'url("css/images/treasure-sort-bg.jpg")');
  } else if (scene === "glass"){
    $(`.search`).css("display", "none");
    $(`.glassPuzzle`).css("display", "block");
    $(`.interview`).css("display", "none");
    $(`body`).css('background-image', 'url("css/images/glass-puzzle.png")');
  } else if (scene === "phone"){
    $(`.search`).css("display", "none");
    $(`.phone`).css("display", "block");
    $(`.interview`).css("display", "none");
    if (phoneGame === true){
      $(`body`).css('background-image', 'url("css/images/phone-bg.jpg")');
    } else {
        $(`body`).css('background-image', 'url("css/images/phone-bg-lock.jpg")');
    }
  }
}

//------------- Search section ----------------
//Office objects
$(`#glassCrack`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "none");
  $(`#returnButton1`).css("display", "block");
  $(`#infoTitle1`).html("A cracked hole in the glass");
  $(`#infoText1`).html("A broken hole in the glass that seems to have been broken in order to get whatever was behind it.");
  scene = "none";
});

$(`#schedule`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "block");
  $(`#returnButton1`).css("display", "none");
  $(`#infoTitle1`).html("The victim's schedule");
  $(`#infoText1`).html("Looks like the victim's schedule for the day of his death. Better examine it to get a better idae of his day");
  $(`#infoButton1`).attr("onclick", 'changeScene("schedule")');
});

$(`#paintingTear`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "none");
  $(`#returnButton1`).css("display", "block");
  $(`#infoTitle1`).html("Scratches in the painting");
  $(`#infoText1`).html("Someone must have gotten into a fight in here... or they just really don't like owls");
  scene = "none";
});

$(`#note`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "block");
  $(`#returnButton1`).css("display", "none");
  $(`#infoTitle1`).html("Victim's final note");
  $(`#infoText1`).html("This note is barely legible, must have been written quickly. It's going to take some effort to decipher it.");
  $(`#infoButton1`).attr("onclick", 'changeScene("decipher")');
  if (!decipherTutorial){
    $(`#infoButton1`).attr("onclick", 'changeScene("decipherT")');
  }
});
//treasury objects
$(`#handprint`).click(function(){
  $(`#infotab2`).css("display", "block");
  $(`#infoButton2`).css("display", "none");
  $(`#returnButton2`).css("display", "block");
  $(`#infoTitle2`).html("A Bloody Handprint");
  $(`#infoText2`).html("Looks like the victim was cut badly before he died, must have left this handprint before he fell over.");
  scene = "none";
});

$(`#knuckles`).click(function(){
  $(`#infotab2`).css("display", "block");
  $(`#infoButton2`).css("display", "none");
  $(`#returnButton2`).css("display", "block");
  $(`#infoTitle2`).html("A pair of gold brass knuckles");
  $(`#infoText2`).html("Could have been used to kill the victim, they look decorative but there's a bunch of dents on them.");
  scene = "none";
});

$(`#treasures`).click(function(){
  $(`#infotab2`).css("display", "block");
  $(`#infoButton2`).css("display", "block");
  $(`#returnButton2`).css("display", "none");
  $(`#infoTitle2`).html("Misplaced Treasures");
  $(`#infoText2`).html("Looks like someone tried to steal these, better put them back to see if anything is missing");
  $(`#infoButton2`).attr("onclick", 'changeScene("treasureSort")');
});

$(`#glass`).click(function(){
  $(`#infotab2`).css("display", "block");
  $(`#infoButton2`).css("display", "block");
  $(`#returnButton2`).css("display", "none");
  $(`#glassButton`).css("display", "block");
  $(`#infoTitle2`).html("Some broken glass");
  $(`#infoText2`).html("Looks like the murderer cut themselves while trying to get into this, Better double check that the shards match up");
  $(`#infoButton2`).attr("onclick", 'changeScene("glass")');
});
//bedroom objects
$(`#phone`).click(function(){
  $(`#infotab3`).css("display", "block");
  $(`#infoButton3`).css("display", "block");
  $(`#returnButton3`).css("display", "none");
  $(`#phoneButton`).css("display", "block");
  $(`#infoTitle3`).html("The victims phone");
  $(`#infoText3`).html("Strange it wasn't on his person when he died");
  $(`#infoButton3`).attr("onclick", 'changeScene("phone")');
});

$(`#wine`).click(function(){
  $(`#infotab3`).css("display", "block");
  $(`#infoButton3`).css("display", "none");
  $(`#returnButton3`).css("display", "block");
  $(`#infoTitle3`).html("An empty bottle of wine and a glass");
  $(`#infoText3`).html("Seems like someone was drinking hard one night...");
  scene = "none";
});

$(`#reminder`).click(function(){
  $(`#infotab3`).css("display", "block");
  $(`#infoButton3`).css("display", "none");
  $(`#returnButton3`).css("display", "block");
  $(`#infoTitle3`).html("A note with reminders");
  $(`#infoText3`).html("Seems like it belonged to the victim. Most of the reminders are about sending money to other people");
  scene = "none";
});

//characters
$(`#caroline`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "block");
  $(`#returnButton1`).css("display", "none");
  $(`#infoTitle1`).html("Caroline Wheeler");
  $(`#infoText1`).html("Our first suspect. She's the victim's assistant");
  $(`#infoButton1`).attr("onclick", 'changeScene("interview")');
  $(`#carolineText`).html('<strong>"Hello there..."</strong>')
  $(`#carolineQ1`).css("display", "block");
  $(`#carolineQ2`).css("display", "block");
  $(`#carolineQ3`).css("display", "block");
  $(`#carolineQ1`).html("Who were you to the victim?");
  $(`#carolineQ2`).html("Where were you on the night of the murder?");
  $(`#carolineQ3`).html("How are you today?");
});
$(`#shane`).click(function(){
  $(`#infotab2`).css("display", "block");
  $(`#infoButton2`).css("display", "block");
  $(`#returnButton2`).css("display", "none");
  $(`#infoTitle2`).html("Shane Harper");
  $(`#infoText2`).html("The second suspect. The victim's rowdy brother");
  $(`#infoButton2`).attr("onclick", 'changeScene("interview")');
  $(`#shaneText`).html('<strong>"Hey, you the detective or something?"</strong>');
  $(`#shaneQ1`).css("display", "block");
  $(`#shaneQ2`).css("display", "block");
  $(`#shaneQ3`).css("display", "block");
  $(`#shaneQ1`).html("Who were you to the victim?");
  $(`#shaneQ2`).html("Where were you the night of the murder?");
  $(`#shaneQ3`).html("What are you doing in here, this is a crime scene?");
});
$(`#danielle`).click(function(){
  $(`#infotab3`).css("display", "block");
  $(`#infoButton3`).css("display", "block");
  $(`#returnButton3`).css("display", "none");
  $(`#infoTitle3`).html("Danielle Harper");
  $(`#infoText3`).html("The final suspect. She's the victim's wife");
  $(`#infoButton3`).attr("onclick", 'changeScene("interview")');
  $(`#danielleText`).html('<strong>"Oh, Hello. You must be the detective on the case"</strong>');
  $(`#danielleQ1`).css("display", "block");
  $(`#danielleQ2`).css("display", "block");
  $(`#danielleQ3`).css("display", "block");
  $(`#danielleQ1`).html("Where were you the night of the murder?");
  $(`#danielleQ2`).html("Who were you to the victim?");
  $(`#danielleQ3`).html("You look very tired, were you up late?");
});

//-------------- Note decipher section --------------
//changes colour when hovering over mixed words
$(`.mixed`).one(`mouseover`, function(event){
  $(this).addClass(`found`);
})

//creates draggable words
$(`.answer`).one(`mouseover`, function(event){
  $(this).draggable({
    revert: true
  });
});

//creates mixed words that are droppable
$(`.mixed`).droppable({
  drop: function(event, ui){
    //get ids and text
    let mixedID = $(this).attr("id");
    let wordID = ui.draggable.attr("id");
    let word = ui.draggable.text();
    //if the words are the same
    if (wordID === mixedID){
      $(this).removeClass(`found`);
      $(this).html(word);
      $(this).droppable
      ui.draggable.draggable(`disable`);
      ui.draggable.text("");
      mixedWords -= 1;
    }
    if (mixedWords <= 0){
      $(`#decipherTextbox`).css("display", "block");
      $(`.page`).css("margin-top", "50px");
      $(`#answers`).css("display", "none");
      noteGame = true;
    }
  }
});

//-------------- Schedule Re-arrange ---------------
$(`#sortEvents`).sortable();

//check if the order of the schedule is right
function checkOrder(){
  let userOrder = $(`#sortEvents`).sortable("toArray");
  //goes through and compares the arrays
  for (let i = 0; i <= userOrder.length; i++){
    let userNum = userOrder[i];
    let solution = scheduleOrder[i];
    if (userNum === solution){
      scheduleScore -= 1;
    }
  }
  //if right, end minigame
  if (scheduleScore <= 0){
    $(`#scheduletext1`).html("<strong>Got it, this should give a better idea of the victims movements that day</strong>");
    $(`#scheduletext2`).html("Looks like he met with all 3 of the suspects that day, each with their own purpose.");
    $(`#scheduletext3`).css("display", "none");
    $(`#scheduleButton`).css("display", "block");
    scheduleGame = true;
  } else { //if wrong flash red and reset
    $(`.event`).css("background-color", "LightCoral");
    setTimeout(function(){
      $(`.event`).css("background-color", "white");
    }, 2000);
    scheduleScore = 6;
  }
}
//-------------- Treasure Sort -------------------
$(`.sort`).one(`mouseover`, function(event){
  $(this).draggable({
    revert: true
  });
});

//if the treasure is dropped in the right place
//show positioned image and add to the finished count
$(`.answer`).droppable({
  drop: function(event, ui){
    //get ids and text
    let ogposition = $(this).attr("id");
    let movable = ui.draggable.attr("id");
    //if the words are the same
    if (movable === `${ogposition}2`){
      $(`#${movable}`).css("display", "none");
      $(`#${ogposition}`).css("visibility", "visible");
      treasuresSorted += 1;
    }
    if (treasuresSorted === 4){
      $(`#treasuretext1`).html("<strong>Looks like one of the treasures is missing. Maybe I can find it around the room.</strong>");
      $(`#treasuretext2`).css("display", "none");
      $(`#treasureButton`).css("display", "block");
      treasureGame = true;
    }
  }
});

//---------------- Glass Puzzle -------------------
//lets pieces be draggable
//when they are placed in a specific location, draggable is disabled
//to show that they are in the right place
$(`.piece`).draggable({
  grid: [10, 10], //100px 100px grid
  stop: function(){
    let xDecimal = $(this).offset().left;
    let yDecimal = $(this).offset().top;
    let x = Math.round(xDecimal);
    let y = Math.round(yDecimal);
    if (x === parseInt($(this).attr(`solutionX`)) && y === parseInt($(this).attr(`solutionY`))) {
      $(this).draggable("disable");
      $(this).removeClass("piece");
    }
    let piecesLeft = $(`.piece`).length;
    if (piecesLeft === 0){
      $(`#glasstext1`).html("<strong>Looks like one of the big shards is missing</strong>");
      $(`#glasstext2`).css("display", "none");
      $(`#glassButton`).css("display", "block");
    }
  }
});

//-------------- Phone Investigation ---------------
//fade in on hover
$(`#fingerprint1`).hover(function(){
  $(this).stop(true).fadeTo(1000, 1);
}, function(){
  $(this).stop(true).fadeTo(500, 0);
});
$(`#fingerprint2`).hover(function(){
  $(this).stop(true).fadeTo(1000, 1);
}, function(){
  $(this).stop(true).fadeTo(500, 0);
});
$(`#fingerprint3`).hover(function(){
  $(this).stop(true).fadeTo(1000, 1);
}, function(){
  $(this).stop(true).fadeTo(500, 0);
});
$(`#fingerprint4`).hover(function(){
  $(this).stop(true).fadeTo(1000, 1);
}, function(){
  $(this).stop(true).fadeTo(500, 0);
});
$(`#fingerprint5`).hover(function(){
  $(this).stop(true).fadeTo(1000, 1);
}, function(){
  $(this).stop(true).fadeTo(500, 0);
});

//click to input passcode
$(`#fingerprint4`).click(function(){
  fingerprintCode = 1;
});
$(`#fingerprint3`).click(function(){
  if (fingerprintCode === 1){
    fingerprintCode = 2;
  } else {
    fingerprintCode = 0;
  }
});
$(`#fingerprint2`).click(function(){
  if (fingerprintCode === 2){
    fingerprintCode = 3;
  } else {
    fingerprintCode = 0;
  }
});
$(`#fingerprint1`).click(function(){
  if (fingerprintCode === 3){
    fingerprintCode = 4;
  } else {
    fingerprintCode = 0;
  }
});
$(`#fingerprint5`).click(function(){
  if (fingerprintCode === 4){
    $(`.locked`).css("display", "none");
    $(`.unlocked`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/phone-bg.jpg")');
    $(`#textsC`).css("display", "block");
    $(`#phonetext1`).html("<strong>Looks like his message app is open</strong>");
    $(`#phonetext2`).html("All of these messages seem to be regarding some sort of money issue or loan");
    $(`#phoneButton`).css("display", "block");
    phoneGame = true;
  } else {
    fingerprintCode = 0;
  }
});

//click icons to see messages
$(`#iconC`).click(function(){
  $(`#textsC`).css("display", "block");
  $(`#textsD`).css("display", "none");
  $(`#textsS`).css("display", "none");
});
$(`#iconD`).click(function(){
  $(`#textsC`).css("display", "none");
  $(`#textsD`).css("display", "block");
  $(`#textsS`).css("display", "none");
});
$(`#iconS`).click(function(){
  $(`#textsC`).css("display", "none");
  $(`#textsD`).css("display", "none");
  $(`#textsS`).css("display", "block");
});

//-------------- Interview section ----------------
//CAROLINE
//if the user click the first button
$("#carolineQ1").click(function(){
  if (roundNum === 1){
    cInterview1();
  } else if (roundNum === 2){
    cInterview2();
  } else if (roundNum === 3){
    cInterview3();
  } else if (roundNum === 4){
    roundNum = 1;
    changeScene("office");
  }
});
//second button adds 1 to ID to get a diferent set of questions
$("#carolineQ2").click(function(){
  id += 1;
  if (roundNum === 1){
    cInterview1();
  } else if (roundNum === 2){
    cInterview2();
  } else if (roundNum === 3){
    cInterview3();
  }
});
//thirs button only works for first time
$("#carolineQ3").click(function(){
  id = 3;
  cInterview1();
});

//Different rounds of Q&A
function cInterview1(){
  if (id === 1){
    $("#carolineText").html("I'm his assistant, Caroline Wheeler.");
    $(`#carolineQ1`).html("Were you and Mr. Harper close?");
    $(`#carolineQ2`).html("What do you do as his assistant?");
  } else if (id === 2){
    $("#carolineText").html("I was out getting some documents for Mr. Harper. I came back to find this mess.");
    $(`#carolineQ1`).html("What do you do as his assistant?");
    $(`#carolineQ2`).html("What time did you come back?");
  } else if (id === 3){
    $("#carolineText").html("Oh...um I guess I'm well. A little startled at the whole murder mess...");
    $(`#carolineQ1`).html("When did you find out about murder?");
    $(`#carolineQ2`).html("Who were you to the victim?");
  }
  $(`#carolineQ3`).css("display", "none");
  roundNum += 1;
}
function cInterview2(){
  if (id === 1){
    $("#carolineText").html("No not really, our relationship was strictly professional.");
    $(`#carolineQ1`).html("Where were you the night of the murder?");
    $(`#carolineQ2`).html("Would you say Mr. Harper was a paranoid person?");
  } else if (id === 2){
    $("#carolineText").html("I keep track of his schedule and fetch documents for him.");
    $(`#carolineQ1`).html("Would you say Mr. Harper was a paranoid person?");
    $(`#carolineQ2`).html("So do you always know where he is?");
  } else if (id === 3){
    $("#carolineText").html("I got to the house at half past 8'o clock, The police were already here when I got here.");
    $(`#carolineQ1`).html("So do you always know where he is?");
    $(`#carolineQ2`).html("Did Mr. Harper have any enemies?");
  } else if (id === 4){
    $("#carolineText").html("I'm his assistant. I manage his schedule and organize his paperwork");
    $(`#carolineQ1`).html("Did Mr. Harper have any enemies?");
    $(`#carolineQ2`).html("Do you like your job?");
  }
  $(`#carolineQ3`).css("display", "none");
  roundNum += 1;
  if (roundNum >= 5){
    $(`#carolineQ2`).css("display", "none");
  }
}
function cInterview3(){
  if (id === 1){
    $("#carolineText").html("I was out getting some documents for Mr. Harper. I came back around 8 o'clock to find this mess.");
  } else if (id === 2){
    $("#carolineText").html("No not parniod but I would say he's unpredicatable. He did a lot of thing without informing me.");
  } else if (id === 3){
    $("#carolineText").html("No, he's a busy man. He did a lot of random things without informing me.");
  } else if (id === 4){
    $("#carolineText").html("He was a lawyer so he made a lot of people mad... Although, I wouldn't say mad enough to kill him");
  } else if (id === 5){
    $("#carolineText").html("Well... It wasn't a bad job but Mr. Harper kept me very busy. I was always very tired...");
  }
  $(`#carolineQ1`).html("Thank you for your time.");
  $(`#carolineQ2`).css("display", "none");
  $(`#carolineQ3`).css("display", "none");
  roundNum += 1;
  carolineInt = true;
}
//SHANE
$("#shaneQ1").click(function(){
  if (roundNum === 1){
    sInterview1();
  } else if (roundNum === 2){
    sInterview2();
  } else if (roundNum === 3){
    sInterview3();
  } else if (roundNum === 4){
    roundNum = 1;
    changeScene("treasure");
  }
});
$("#shaneQ2").click(function(){
  id += 1;
  if (roundNum === 1){
    sInterview1();
  } else if (roundNum === 2){
    sInterview2();
  } else if (roundNum === 3){
    sInterview3();
  }
});
$("#shaneQ3").click(function(){
  id = 3;
  sInterview1();
});

function sInterview1(){
  if (id === 1){
    $("#shaneText").html("I’m his brother, names Shane");
    $(`#shaneQ1`).html("You shouldn’t be in here, this is a crime scene");
    $(`#shaneQ2`).html("Were you close to your brother?");
  } else if (id === 2){
    $("#shaneText").html("Me? I was at my buddies bar! You can’t be thinkin I killed my own brother?!");
    $(`#shaneQ1`).html("Were you close to your brother?");
    $(`#shaneQ2`).html("Do you know if your brother had any enemies?");
  } else if (id === 3){
    $("#shaneText").html("Calm down, I’m just looking. Haven’t stolen anything yet");
    $(`#shaneQ1`).html("Anyway, do you know anyone who could have done this?");
    $(`#shaneQ2`).html("Anyway, were you anywhere near the victim the day of the murder?");
  }
  $(`#shaneQ3`).css("display", "none");
  roundNum += 1;
}
function sInterview2(){
  if (id === 1){
    $("#shaneText").html("Calm down, I’m just looking. Haven’t stolen anything yet");
    $(`#shaneQ1`).html("Anyway, do you know anyone who could have done this?");
    $(`#shaneQ2`).html("Anyway, were you anywhere near the victim the day of the murder?");
  } else if (id === 2){
    $("#shaneText").html("Eh kinda. We talked a lot but he was always so paranoid about his treasures so I never got close to him.");
    $(`#shaneQ1`).html("Were you anywhere near the victim the day of the murder?");
    $(`#shaneQ2`).html("Are these treasures worth a lot??");
  } else if (id === 3){
    $("#shaneText").html("Maybe someone from his work? I’ve never been but I know people there aren’t too keen of him");
    $(`#shaneQ1`).html("What do you mean by not too keen?");
    $(`#shaneQ2`).html("Are you close to anyone else in the household?");
  } else if (id === 4){
    $("#shaneText").html("I came in the morning to talk to him but he kicked me out. I was angry so I stayed away from the jerk for the rest of the day");
    $(`#shaneQ1`).html("Are you close to anyone else in the household?");
    $(`#shaneQ2`).html("What did you two talk about?");
  }
  $(`#shaneQ3`).css("display", "none");
  roundNum += 1;
  if (roundNum >= 5){
    $(`#shaneQ2`).css("display", "none");
  }
}
function sInterview3(){
  if (id === 1){
    $("#shaneText").html("Maybe someone from his work? I’ve never been but I know people there aren’t too keen of him");
  } else if (id === 2){
    $("#shaneText").html("I came in the morning to talk to him but he kicked me out. I was angry so I stayed away from the jerk for the rest of the day");
  } else if (id === 3){
    $("#shaneText").html("Not all of them but a few are a goldmine. I’ve been asking him for one for a while! Especially a fan of those gold knuckles");
  } else if (id === 4){
    $("#shaneText").html("Look I love Nic, but he’s not the nicest guy. Gets territorial like a damn dog so it’s real easy to get him angry");
  }else if (id === 5){
    $("#shaneText").html("Me and Dani are pretty close, but Nic is so protective of her we never have time to talk. His damn assistant is always stalking around, watching…");
  } else if (id === 6){
    $("#shaneText").html("Ay uh- personal matters… only got a few minutes in before Nic came knocking");
  }
  $(`#shaneQ1`).html("Thank you for your time.");
  $(`#shaneQ2`).css("display", "none");
  $(`#shaneQ3`).css("display", "none");
  roundNum += 1;
  shaneInt = true;
}
//DANIELLE
$("#danielleQ1").click(function(){
  if (roundNum === 1){
    dInterview1();
  } else if (roundNum === 2){
    dInterview2();
  } else if (roundNum === 3){
    dInterview3();
  } else if (roundNum === 4){
    roundNum = 1;
    changeScene("bedroom");
  }
});
$("#danielleQ2").click(function(){
  id += 1;
  if (roundNum === 1){
    dInterview1();
  } else if (roundNum === 2){
    dInterview2();
  } else if (roundNum === 3){
    dInterview3();
  }
});
$("#danielleQ3").click(function(){
  id = 3;
  dInterview1();
});

function dInterview1(){
  if (id === 1){
    $("#danielleText").html("I was up here actually, I was in my room most of the night");
    $(`#danielleQ1`).html("What time did you find your husband dead?");
    $(`#danielleQ2`).html("What were you doing up here?");
  } else if (id === 2){
    $("#danielleText").html("I’m his wife, my name is Danielle Harper");
    $(`#danielleQ1`).html("What were you up to the night of the murder?");
    $(`#danielleQ2`).html("Were you the one who found the body?");
  } else if (id === 3){
    $("#danielleText").html("Oh um yes- It’s been a very stressful few days");
    $(`#danielleQ1`).html("Were you the one who found the body?");
    $(`#danielleQ2`).html("Did you and Mr. Harper have a good relationship");
  }
  $(`#danielleQ3`).css("display", "none");
  roundNum += 1;
}
function dInterview2(){
  if (id === 1){
    $("#danielleText").html("Around 8 I believe? That is the last time I can remember before the chaos started");
    $(`#danielleQ1`).html("Did you see or hear anyone enter the house before then?");
    $(`#danielleQ2`).html("Did you hear any loud noises throughout the night? Like fighting or glass breaking?");
  } else if (id === 2){
    $("#danielleText").html("Um, It’s a little embarrassing but I was drinking and watching my drama on Nicholas’s phone");
    $(`#danielleQ1`).html("Did you hear any loud noises throughout the night? Like fighting or glass breaking?");
    $(`#danielleQ2`).html("Did you see anything unusual during the night?");
  } else if (id === 3){
    $("#danielleText").html("Yes, I saw it when I went downstairs for some water. It was… horrifying. I called the police immediately");
    $(`#danielleQ1`).html("Did you see anything unusual during the night?");
    $(`#danielleQ2`).html("Was your husband a paranoid person? He talked of footsteps in his final note.");
  } else if (id === 4){
    $("#danielleText").html("Oh of course! I loved Nicolas a lot. I always thought we would be married for most of my life…");
    $(`#danielleQ1`).html("Was your husband a paranoid person? He talked of footsteps in his final note.");
    $(`#danielleQ2`).html("Were you close with his brother? Shane?");
  }
  $(`#danielleQ3`).css("display", "none");
  roundNum += 1;
  if (roundNum >= 5){
    $(`#danielleQ2`).css("display", "none");
  }
}
function dInterview3(){
  if (id === 1){
    $("#danielleText").html("The last person I saw around the house was Nicolas’s assistant. I can’t remember when I saw her…");
  } else if (id === 2){
    $("#danielleText").html("Well, no. You see the house is very big and I was caught up in my… drama so I wasn’t paying attention.");
  } else if (id === 3){
    $("#danielleText").html("I’m not sure if it was real but I could have sworn I heard someone walking around outside this window. No one should be out there at that time though.");
  }  else if (id === 4){
    $("#danielleText").html("He was protective but never paranoid. To be completely honest, I was pacing around upstairs throughout the night. He might have been hearing me…");
  } else if (id === 5){
    $("#danielleText").html("Shane? No not really… Whenever we talk it feels as if he’s flirting with me so I only act nice because he’s Nicolas’s brother");
  }
  $(`#danielleQ1`).html("Thank you for your time.");
  $(`#danielleQ2`).css("display", "none");
  $(`#danielleQ3`).css("display", "none");
  roundNum += 1;
  danielleInt = true;
}

//----------------- ENDING --------------
//checks if user has finsihed all the games
function progressCheck(){
  if ( shaneInt === true &&
  danielleInt === true &&
  carolineInt === true &&
  scheduleGame === true &&
  noteGame === true &&
  treasureGame === true &&
  phoneGame === true) {
    $(`.guessPhase`).css("display", "block");
    $(`.travelscene`).css("display", "none");
    $(`.notepad`).css("display", "none");
    $(`.notes`).css("display", "none");
  } else {
    alert("You haven't found all the clues yet!");
  }
}

//navigates the ending screens
function changeEndScene(endScene){
  if (endScene === 'caroline'){
    $(`.endTut`).css("display", "none");
    $(`.cStory`).css("display", "flex");
  } else if (endScene === 'shane'){
    $(`.cStory`).css("display", "none");
    $(`.sStory`).css("display", "flex");
  } else if (endScene === 'danielle'){
    $(`.sStory`).css("display", "none");
    $(`.dStory`).css("display", "flex");
  } else if (endScene === 'events'){
    $(`.dStory`).css("display", "none");
    $(`.events`).css("display", "block");
  } else if (endScene === 'final'){
    $(`.events`).css("display", "none");
    $(`.finalChoice`).css("display", "block");
  }
}

//final select click
$(`#carolineF`).click(function(){
  $(`#finalSuspect`).attr("src", "css/images/carolineSuspect.png");
  $(`#finalSuspect`).css("border", "4px solid white");
  finalSuspect = "caroline";
});
$(`#shaneF`).click(function(){
  $(`#finalSuspect`).attr("src", "css/images/shaneSuspect.png");
  $(`#finalSuspect`).css("border", "4px solid white");
  finalSuspect = "shane";
});
$(`#danielleF`).click(function(){
  $(`#finalSuspect`).attr("src", "css/images/danielleSuspect.png");
  $(`#finalSuspect`).css("border", "4px solid white");
  finalSuspect = "danielle";
});
$(`#glassF`).click(function(){
  $(`#finalWeapon`).attr("src", "css/images/glassWeapon.png");
  $(`#finalWeapon`).css("border", "4px solid white");
  finalWeapon = "glass";
});
$(`#knucklesF`).click(function(){
  $(`#finalWeapon`).attr("src", "css/images/knucklesWeapon.png");
  $(`#finalWeapon`).css("border", "4px solid white");
  finalWeapon = "knuckles";
});

//final cutscene is based on who the user chose as the murderer
function finalCutscene(){
  let round = 1;
  $(`.cutscene`).css("display", "block");
  $(`.guessPhase`).css("display", "none");
  if (finalSuspect === "caroline"){
    carolineEnd(round);
    round += 1;
    //changes characters speaking every 4.5 secs to create the cutscene
    setInterval(function(){
      carolineEnd(round);
      if (round === 12){
        $(`.cutscene`).css("display", "none");
        $(`.ending`).css("display", "block");
        //different ending based on weapon choices
        //neutral = wrong weapon
        //win = right weapon
        if (finalWeapon === "glass"){
          $(`#win`).css("display", "block");
        } else if (finalWeapon === "knuckles"){
          $(`#neutral`).css("display", "block");
        }
        clearInterval();
      } else {
        round++;
      }
    }, 4500);
  } else if (finalSuspect === "danielle"){
    danielleEnd(round);
    round += 1;
    setInterval(function(){
      danielleEnd(round);
      if (round === 7){
        $(`.cutscene`).css("display", "none");
        $(`.ending`).css("display", "block");
        $(`#lose`).css("display", "block");
        clearInterval();
      } else {
        round++;
      }
    }, 4500);
  } else if (finalSuspect === "shane"){
    shaneEnd(round);
    round += 1;
    setInterval(function(){
      shaneEnd(round);
      if (round === 11){
        $(`.cutscene`).css("display", "none");
        $(`.ending`).css("display", "block");
        $(`#lose`).css("display", "block");
        clearInterval();
      } else {
        round++;
      }
    }, 4500);
  }
}

//For lose endings, in case the user wants to know who did it
//without playing through it again
function showEnd(){
  $(`#trueEnd`).html("It's was actually Caroline who killed her boss after he pushed her to her limits for the last time.<br>Her plan was to frame Shane by tampering with the victim's note and stealing his treasure collection but not his money.<br>That way Danielle, who she felt bad for, would sitll have funds for herself. She was able to sneak up on the victim because she had a key to the back door, but the victim over powered her so she was forced to fight.<br> She ended up using the glass shard to kill him because he knocked the knuckles out of her hands.");
}

//cutscene functions
function carolineEnd(round){
  if (round === 1){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("Wh-wait!! I-I didn’t do anything! You must be mistaken");
  } else if (round === 2){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("Caroline… you killed him?!");
  } else if (round === 3){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("Oh hey! Called it! Someone from his work killed him!");
  } else if (round === 4){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("There’s no way I did it!! I was out getting papers when he was in the office!!");
  } else if (round === 5){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("...How did you know he was in the office before he died...");
  } else if (round === 6){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("N- wait… Danielle I didn’t");
  } else if (round === 7){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("Get out of my house");
  } else if (round === 8){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("HAHAHA, ya busted yourself you idiot!");
  } else if (round === 9){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("No! I- I wasn’t wrong!! He was an awful man! He pushed me to my limit every day but never gave me any kind of compensation!");
  } else if (round === 10){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("That gives you no right to kill him!");
  } else if (round === 11){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("He was an asshole and you know it!! If I hadn’t killed that jerk someone else would have done it!");
  } else if (round === 12){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("Get her out of here already!");
  }
}

function danielleEnd(round){
  if (round === 1){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("N-no! I was just a little tipsy, I would never kill my own husband!");
  } else if (round === 2){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("Dani don’t tell me you actually did it...");
  } else if (round === 3){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("...I can’t believe it");
  } else if (round === 4){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("I didn’t kill anyone! I’m innocent!! I was in my room the whole time I swear!");
  } else if (round === 5){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("You needed the money that bad huh?");
  } else if (round === 6){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("NO! he was going to give me the money later! I love Nicolas, I would never");
  } else if (round === 7){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("I’m sorry Danielle but you should go…");
  }
}

function shaneEnd(round){
  if (round === 1){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("I'm sorry, what?! You think I killed my brother??");
  } else if (round === 2){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("Shane...");
  } else if (round === 3){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("I can't believe you did this... to your own brother too!");
  } else if (round === 4){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("You too can't possibly be believing this!! Dani come on-");
  } else if (round === 5){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("I can't believe you- was he only a bank to you?!");
  } else if (round === 6){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("No!! I was at my buddies bar tellin him I couldn't get the cash! I wasn't even that mad!!");
  } else if (round === 7){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("Your brother denied you, of course you were mad! Mad enough to kill him...");
  } else if (round === 8){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("Just leave shane. I don't want you near my house anymore");
  } else if (round === 9){
    $(`#cutsceneImg`).attr("src", "css/images/shanehalf.png");
    $(`#cutsceneName`).html("<strong>Shane, The Brother</strong>");
    $(`#cutsceneText`).html("Dani I promise you, I didn't do this-");
  } else if (round === 10){
    $(`#cutsceneImg`).attr("src", "css/images/daniellehalf.png");
    $(`#cutsceneName`).html("<strong>Danielle, The Wife</strong>");
    $(`#cutsceneText`).html("Get out.");
  } else if (round === 11){
    $(`#cutsceneImg`).attr("src", "css/images/carolinehalf.png");
    $(`#cutsceneName`).html("<strong>Caroline, The Assistant</strong>");
    $(`#cutsceneText`).html("I'm sorry danielle");
  }
}
