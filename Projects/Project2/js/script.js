/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let currentRoom = "travel";
let roundNum = 1;
let id = 1;
let scene = "search";
let interviewDone = false;
let noteDone = false;
let mixedWords = 10;
let treasuresSorted = 0;
let decipherTutorial = false;
let scheduleOrder = ["1", "4", "2", "5", "3", "6"];
let scheduleScore = 6;
let notepadStatus = "open";
//fingerprint
let fingerprintCode = 0;

//------------- CHANGE LOCATIONS ------------
function changeRoom(nextRoom){
  if (nextRoom === "office"){
    $(`.mainHall`).css("display", "none");
    $(`.notepad`).css("display", "none");
    $(`.office`).css("display", "block");
    $(`#returnButton1`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/office.png")');
    currentRoom = "office";
  } else if (nextRoom === "treasure"){
    $(`.mainHall`).css("display", "none");
    $(`.notepad`).css("display", "none");
    $(`.treasure`).css("display", "block");
    $(`#returnButton2`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/treasure.png")');
    currentRoom = "treasure";
  } else if (nextRoom === "bedroom"){
    $(`.mainHall`).css("display", "none");
    $(`.notepad`).css("display", "none");
    $(`.bedroom`).css("display", "block");
    $(`#returnButton3`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/bedroom.png")');
    currentRoom = "bedroom";
  } else if (nextRoom === "main"){
    $(`.mainHall`).css("display", "flex");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    $(`.office`).css("display", "none");
    $(`.treasure`).css("display", "none");
    $(`.bedroom`).css("display", "none");
    $(`.notepad`).css("display", "block");
    $(`body`).css('background-image', 'url("css/images/main-hall.png")');
    currentRoom = "travel";
  }
}

//------------- Change scene ---------------
function changeScene(currentScene){
  scene = currentScene;
  if (scene === "tutorial"){
    $(`.tutorial`).css("display", "none");
    $(`.travelscene`).css("display", "flex");
    $(`.notepad`).css("display", "block");
  } else if (scene === "interview"){
    $(`.search`).css("display", "none");
    $(`.decipher`).css("display", "none");
    $(`.interview`).css("display", "block");
  } else if (scene === "office"){
    $(`.decipher`).css("display", "none");
    $(`.search`).css("display", "block");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    $(`body`).css('background-image', 'url("css/images/office.png")');
  } else if (scene === "bedroom"){
    $(`.phone`).css("display", "none");
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
    $(`#main`).css("display", "block");
  } else if (scene === "treasure"){
    $(`.treasureSort`).css("display", "none");
    $(`.glassPuzzle`).css("display", "none");
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
    $(`body`).css('background-image', 'url("css/images/glass-puzzle.jpg")');
  } else if (scene === "phone"){
    $(`.search`).css("display", "none");
    $(`.phone`).css("display", "block");
    $(`.interview`).css("display", "none");
    $(`body`).css('background-image', 'url("css/images/phone-bg-lock.jpg")');
  }
}

//------------- Search section ----------------
//Office objects
$(`#glassCrack`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "none");
  $(`#returnButton1`).css("display", "block");
  $(`#infoTitle1`).html("A cracked hole in the glass");
  $(`#infoText1`).html("A broken hole in the glass that seems to have been brokwn in a fight.");
  scene = "none";
});

$(`#schedule`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "block");
  $(`#returnButton1`).css("display", "none");
  $(`#infoTitle1`).html("The victim's schedule");
  $(`#infoText1`).html("Looks like the victim's schedule for the day of his death. Doesn't look like it was made for him though");
  $(`#infoButton1`).attr("onclick", 'changeScene("schedule")');
});

$(`#paintingTear`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "none");
  $(`#returnButton1`).css("display", "block");
  $(`#infoTitle1`).html("Scratches in the painting");
  $(`#infoText1`).html("Someone must have gotten angry with a knife in hand... or they just really don't like owls");
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
  $(`#infoText2`).html("Could have been used to kill the victim although they look pretty decorative.");
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
  $(`#infoText3`).html("Seems like it belonged to the victim. Most of the reminders are about sending money, some of which is directed to our three suspects");
  scene = "none";
});

//characters
$(`#caroline`).click(function(){
  $(`#infotab1`).css("display", "block");
  $(`#infoButton1`).css("display", "block");
  $(`#infoTitle1`).html("Caroline Wheeler");
  $(`#infoText1`).html("Our first suspect. She's the victim's assistant");
  $(`#infoButton1`).attr("onclick", 'changeScene("interview")');
});
$(`#shane`).click(function(){
  $(`#infotab2`).css("display", "block");
  $(`#infoButton2`).css("display", "block");
  $(`#infoTitle2`).html("Shane Harper");
  $(`#infoText2`).html("The second suspect. The victim's rowdy brother");
  $(`#infoButton2`).attr("onclick", 'changeScene("interview")');
});
$(`#danielle`).click(function(){
  $(`#infotab3`).css("display", "block");
  $(`#infoButton3`).css("display", "block");
  $(`#returnButton3`).css("display", "none");
  $(`#infoTitle3`).html("Danielle Harper");
  $(`#infoText3`).html("The final suspect. She's the victim's wife");
  $(`#infoButton3`).attr("onclick", 'changeScene("interview")');
});

//-------------- Notepad ------------------------

$(`#notepadOpen`).click(function(){
    $(`.open`).css("display", "none");
    $(`.closed`).css("display", "block");
});

$(`#notepadClosed`).click(function(){
  $(`.open`).css("display", "block");
  $(`.closed`).css("display", "none");
})

//-------------- Note decipher section --------------
$(`.mixed`).one(`mouseover`, function(event){
  $(this).addClass(`found`);
})

$(`.answer`).one(`mouseover`, function(event){
  $(this).draggable({
    revert: true
  });
});

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
    }
  }
});

//-------------- Schedule Re-arrange ---------------
$(`#sortEvents`).sortable();

function checkOrder(){
  let userOrder = $(`#sortEvents`).sortable("toArray");
  for (let i = 0; i <= userOrder.length; i++){
    let userNum = userOrder[i];
    let solution = scheduleOrder[i];
    if (userNum === solution){
      scheduleScore -= 1;
    }
  }
  //if right, end minigame
  if (scheduleScore <= 0){
    $(`#scheduletext1`).html("<strong>Got it, this should give a better idea of the victims movement</strong>");
    $(`#scheduletext2`).css("display", "none");
    $(`#scheduleButton`).css("display", "block");
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
    }
  }
});

//---------------- Glass Puzzle -------------------
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
  $(this).css("opacity", "1");
}, function(){
  $(this).css("opacity", "0");
});

$(`#fingerprint2`).hover(function(){
  $(this).css("opacity", "1");
}, function(){
  $(this).css("opacity", "0");
});

$(`#fingerprint3`).hover(function(){
  $(this).css("opacity", "1");
}, function(){
  $(this).css("opacity", "0");
});

$(`#fingerprint4`).hover(function(){
  $(this).css("opacity", "1");
}, function(){
  $(this).css("opacity", "0");
});

$(`#fingerprint5`).hover(function(){
  $(this).css("opacity", "1");
}, function(){
  $(this).css("opacity", "0");
});

//passcode
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
  } else {
    fingerprintCode = 0;
  }
});

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
$("#userText1").click(function(){
  if (roundNum === 1){
    interviewSet();
  } else if (roundNum === 2){
    interviewSet2();
  } else if (roundNum === 3){
    interviewSet3();
  } else if (roundNum === 4){
    $(`.interview`).css("display", "none");
    $(`.search`).css("display", "block");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    interviewDone = true;
  }
});
//interview round 2
$("#userText2").click(function(){
  id += 1;
  if (roundNum === 1){
    interviewSet();
  } else if (roundNum === 2){
    interviewSet2();
  } else if (roundNum === 3){
    interviewSet3();
  }
});
//interview round 3
$("#userText3").click(function(){
  id = 3;
  interviewSet();
});

function interviewSet(){
  if (currentRoom === "office"){
    if (id === 1){
      $("#charText").html("I'm his assistant, Caroline Wheeler.");
      $(`#userText1`).html("Were you and Mr. Harper close?");
      $(`#userText2`).html("What do you do as his assistant?");
    } else if (id === 2){
      $("#charText").html("I was out getting some documents for Mr. Harper. I came back to find this mess.");
      $(`#userText1`).html("What do you do as his assistant?");
      $(`#userText2`).html("What time did you come back?");
    } else if (id === 3){
      $("#charText").html("Oh...um I guess I'm well. A little startled at the whole murder mess...");
      $(`#userText1`).html("When did you find out about murder?");
      $(`#userText2`).html("Who were you to the victim?");
    }
  } else if (currentRoom === "treasure"){
    if (id === 1){
      $("#charText").html("I’m his brother, names Shane");
      $(`#userText1`).html("You shouldn’t be in here, this is a crime scene");
      $(`#userText2`).html("Were you close to your brother?");
    } else if (id === 2){
      $("#charText").html("Me? I was at my buddies bar! You can’t be thinkin I killed my own brother?!");
      $(`#userText1`).html("Were you close to your brother?");
      $(`#userText2`).html("Do you know if your brother had any enemies?");
    } else if (id === 3){
      $("#charText").html("Calm down, I’m just looking. Haven’t stolen anything yet");
      $(`#userText1`).html("Anyway, do you know anyone who could have done this?");
      $(`#userText2`).html("Anyway, were you anywhere near the victim the day of the murder?");
    }
  } else if (currentRoom === "bedroom"){
    if (id === 1){
      $("#charText").html("I was up here actually, I was in my room most of the night");
      $(`#userText1`).html("What time did you find your husband dead?");
      $(`#userText2`).html("What were you doing up here?");
    } else if (id === 2){
      $("#charText").html("I’m his wife, my name is Danielle Harper");
      $(`#userText1`).html("What were you up to the night of the murder?");
      $(`#userText2`).html("Were you the one who found the body?");
    } else if (id === 3){
      $("#charText").html("Oh um yes- It’s been a very stressful few days");
      $(`#userText1`).html("Were you the one who found the body?");
      $(`#userText2`).html("Did you and Mr. Harper have a good relationship");
    }
  }
  $(`#userText3`).css("display", "none");
  roundNum += 1;
}

function interviewSet2(){
  if (currentRoom === "office"){
    if (id === 1){
      $("#charText").html("No not really, our relationship was strictly professional.");
      $(`#userText1`).html("Where were you the night of the murder?");
      $(`#userText2`).html("Would you say Mr. Harper was a paranoid person?");
    } else if (id === 2){
      $("#charText").html("I keep track of his schedule and fetch documents for him.");
      $(`#userText1`).html("Would you say Mr. Harper was a paranoid person?");
      $(`#userText2`).html("So do you always know where he is?");
    } else if (id === 3){
      $("#charText").html("I got to the house 8'o clock, The police were already here when I got here.");
      $(`#userText1`).html("Were you and Mr. Harper close?");
      $(`#userText2`).html("Did Mr. Harper have any enemies?");
    } else if (id === 4){
      $("#charText").html("I'm his assistant. I manage his schedule and organize his paperwork");
      $(`#userText1`).html("Did Mr. Harper have any enemies?");
      $(`#userText2`).html("Do you like your job?");
    }
  } else if (currentRoom === "treasure"){
    if (id === 1){
      $("#charText").html("Calm down, I’m just looking. Haven’t stolen anything yet");
      $(`#userText1`).html("Anyway, do you know anyone who could have done this?");
      $(`#userText2`).html("Anyway, were you anywhere near the victim the day of the murder?");
    } else if (id === 2){
      $("#charText").html("Eh kinda. We talked a lot but he was always so paranoid about his treasures so I never got close to him.");
      $(`#userText1`).html("Were you anywhere near the victim the day of the murder?");
      $(`#userText2`).html("Are these treasures worth a lot??");
    } else if (id === 3){
      $("#charText").html("Maybe someone from his work? I’ve never been but I know people there aren’t too keen of him");
      $(`#userText1`).html("What do you mean by not too keen?");
      $(`#userText2`).html("Are you close to anyone else in the household?");
    } else if (id === 4){
      $("#charText").html("I came in the morning to talk to him but he kicked me out. I was angry so I stayed away from the jerk for the rest of the day");
      $(`#userText1`).html("Are you close to anyone else in the household?");
      $(`#userText2`).html("What did you two talk about?");
    }
  } else if (currentRoom === "bedroom"){
    if (id === 1){
      $("#charText").html("Around 7 I believe? That is the last time I can remember before the chaos started");
      $(`#userText1`).html("Did you see or hear anyone enter the house before then?");
      $(`#userText2`).html("Did you hear any loud noises throughout the night? Like fighting or glass breaking?");
    } else if (id === 2){
      $("#charText").html("Um, It’s a little embarrassing but I was drinking and watching my drama on Nicholas’s laptop");
      $(`#userText1`).html("Did you hear any loud noises throughout the night? Like fighting or glass breaking?");
      $(`#userText2`).html("Did you see anything unusual during the night?");
    } else if (id === 3){
      $("#charText").html("Yes, I saw it when I went downstairs for some water. It was… horrifying. I called the police immediately");
      $(`#userText1`).html("Did you see anything unusual during the night?");
      $(`#userText2`).html("Was your husband a paranoid person? He talked of footsteps in his final note.");
    } else if (id === 4){
      $("#charText").html("Oh of course! I loved Nicolas a lot. I always thought we would be married for most of my life…");
      $(`#userText1`).html("Was your husband a paranoid person? He talked of footsteps in his final note.");
      $(`#userText2`).html("Were you close with his brother? Shane?");
    }
  }
  $(`#userText3`).css("display", "none");
  roundNum += 1;
  if (roundNum >= 5){
    $(`#userText2`).css("display", "none");
  }
}

function interviewSet3(){
  if (currentRoom === "office"){
    if (id === 1){
      $("#charText").html("I was out getting some documents for Mr. Harper. I came back around 8 o'clock to find this mess.");
    } else if (id === 2){
      $("#charText").html("No not parniod but I would say he's unpredicatable. He did a lot of thing without informing me.");
    } else if (id === 3){
      $("#charText").html("No, he's a busy man. He did a lot of random things without informing me.");
    } else if (id === 4){
      $("#charText").html("No not really, our relationship was strictly professional.");
    }else if (id === 5){
      $("#charText").html("He was a lawyer so he made a lot of people mad... Although, I wouldn't say mad enough to kill him");
    } else if (id === 6){
      $("#charText").html("Well... It wasn't a bad job but Mr. Harper kept me very busy. I was always very tired...");
    }
  }
  $(`#userText1`).html("Thank you for your time.");
  $(`#userText2`).css("display", "none");
  $(`#userText3`).css("display", "none");
  roundNum += 1;
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
    $(`.dInterview`).css("display", "none");
    $(`.bedroomSearch`).css("display", "block");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    interviewDone = true;
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
    $("#charText").html("I came in the morning to talk to him but he kicked me out. I was angry so I stayed away from the jerk for the rest of the day");
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
    $("#shaneText").html("Not all of them but a few are a goldmine. I’ve seen people offer millions for Nic to sell em. He never got the chance tho");
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
}

$("#danielleQ1").click(function(){
  if (roundNum === 1){
    dInterview1();
  } else if (roundNum === 2){
    dInterview2();
  } else if (roundNum === 3){
    dInterview3();
  } else if (roundNum === 4){
    $(`.dInterview`).css("display", "none");
    $(`.bedroomSearch`).css("display", "block");
    $(`#infotab`).css("display", "none");
    $(`#infoButton`).css("display", "none");
    interviewDone = true;
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
    $("#danielleText").html("Around 7 I believe? That is the last time I can remember before the chaos started");
    $(`#danielleQ1`).html("Did you see or hear anyone enter the house before then?");
    $(`#danielleQ2`).html("Did you hear any loud noises throughout the night? Like fighting or glass breaking?");
  } else if (id === 2){
    $("#danielleText").html("Um, It’s a little embarrassing but I was drinking and watching my drama on Nicholas’s laptop");
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
    $("#danielleText").html("I’m not sure if it was real but I could have sworn I heard someone walking around outside this window. No one should be out there at that time.");
  }  else if (id === 4){
    $("#danielleText").html("He was protective but never paranoid. To be completely honest, I was pacing around upstairs throughout the night. He might have been hearing me…");
  } else if (id === 5){
    $("#danielleText").html("Shane? No not really… Whenever we talk it feels as if he’s flirting with me so I only act nice because he’s Nicolas’s brother");
  }
  $(`#danielleQ1`).html("Thank you for your time.");
  $(`#danielleQ2`).css("display", "none");
  $(`#danielleQ3`).css("display", "none");
  roundNum += 1;
}
