/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let roundNum = 1;
let id = 1;
let scene = "search";
let interviewDone = false;
let noteDone = false;
let mixedWords = 10;
let decipherTutorial = false;

//------------- Change scene ---------------
function changeScene(currentScene){
  scene = currentScene;
  console.log(scene, decipherTutorial);
  if (scene === "search"){
    $(`.tutorial`).css("display", "none");
    $(`.search`).css("display", "block");
  } else if (scene === "interview"){
    $(`.search`).css("display", "none");
    $(`.decipher`).css("display", "none");
    $(`.interview`).css("display", "block");
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
  }
}

//------------- Search section ----------------
$(`#glassCrack`).click(function(){
  $(`#infotab`).css("display", "block");
  $(`#infoButton`).css("display", "none");
  $(`#infoTitle`).html("A cracked hole in the glass");
  $(`#infoText`).html("A broken hole in the glass that seems to have been brokwn in a fight.");
  scene = "none";
});

$(`#schedule`).click(function(){
  $(`#infotab`).css("display", "block");
  $(`#infoButton`).css("display", "none");
  $(`#infoTitle`).html("The victim's schedule");
  $(`#infoText`).html("Looks like the victim's schedule for the day of his death. Doesn't look like it was made for him though");
  scene = "none";
});

$(`#paintingTear`).click(function(){
  $(`#infotab`).css("display", "block");
  $(`#infoButton`).css("display", "none");
  $(`#infoTitle`).html("Scratches in the painting");
  $(`#infoText`).html("Someone must have gotten angry with a knife in hand... or they just really don't like owls");
  scene = "none";
});

$(`#note`).click(function(){
  $(`#infotab`).css("display", "block");
  $(`#infoButton`).css("display", "block");
  $(`#infoTitle`).html("Victim's final note");
  $(`#infoText`).html("This note is barely legible, must have been written quickly. It's going to take some effort to decipher it.");
  $(`#infoButton`).attr("onclick", 'changeScene("decipher")');
  if (!decipherTutorial){
    $(`#infoButton`).attr("onclick", 'changeScene("decipherT")');
  }
});

$(`#caroline`).click(function(){
  $(`#infotab`).css("display", "block");
  $(`#infoButton`).css("display", "none");
  if (!interviewDone){
    $(`#infoButton`).css("display", "block");
  }
  $(`#infoTitle`).html("Caroline Wheeler");
  $(`#infoText`).html("Our first suspect. She's the victim's assistant");
  $(`#infoButton`).attr("onclick", 'changeScene("interview")');
});

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
      $(`.decipher`).css("display", "none");
      $(`.search`).css("display", "block");
      $(`#infotab`).css("display", "none");
      $(`#infoButton`).css("display", "none");
    }
  }
})

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
$("#userText3").click(function(){
  id = 3;
  interviewSet(roundNum, id);
});

function interviewSet(){
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
  $(`#userText3`).css("display", "none");
  roundNum += 1;
}

function interviewSet2(){
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
  $(`#userText3`).css("display", "none");
  roundNum += 1;
}

function interviewSet3(){
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
  $(`#userText1`).html("Thank you for your time.");
  $(`#userText2`).css("display", "none");
  $(`#userText3`).css("display", "none");
  roundNum += 1;
}
