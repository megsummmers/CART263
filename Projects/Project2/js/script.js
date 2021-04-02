/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
/*
1("I'm his assistant, Caroline Wheeler.");
2("I was out getting some documents for Mr. Harper. I only came back around 8 o'clock to find this mess.");
3("Oh...um I guess I'm well. A little startled at the whole murder mess...");
*/

let set1 = {
  title: ["I'm his assistant, Caroline Wheeler.", "I keep track of his schedule and fetch documents for him.", "No. Mr. Harper can be... unpredicatable at times", "Not irrational- he just did a lot of things without telling me"],
  userText1: ["What do you do as his assistant?", "So you always know where he is?", "Would you say he was irrational at times?", " "],
  userText2: ["Were you and Mr. Harper close?", "Do you like your job?", "Would you say he was anxious?", "thank you for your time."],
  userText3: ["Do you like your job?", "What is your relationship to the victim?", "Did he have any enemies?", " "]
}

let set2 = {
  title: ["I was out getting some documents for Mr. Harper. I came back to find this mess.", ],
  userText1: ["What time did you come back?",],
  userText2: ["Were you with him before you went out?", ],
  userText3: ["What do you do as an assistant",]
}

let set3 = {
  title: ["Oh...um I guess I'm well. A little startled at the whole murder mess..."],
  userText1: ["Where were you the night of the murder?"],
  userText2: ["I'm glad you're ok"],
  userText3: ["Who were you to the victim?"]
}

let roundNum = 0;
let scene = "interview";
let mixedWords = 10;

//Clickable section
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
  scene = "decipher";
});

$(`#caroline`).click(function(){
  $(`#infotab`).css("display", "block");
  $(`#infoButton`).css("display", "block");
  $(`#infoTitle`).html("Caroline Wheeler");
  $(`#infoText`).html("Our first suspect. She's the victim's assistant");
  scene = "interview";
});

//page decipher Section
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

//change to minigame/Interview
function changeScene(){
  $(`.search`).css("display", "none");
  if (scene === "interview"){
    $(`.interview`).css("display", "block");
  } else if (scene === "decipher"){
    $(`.decipher`).css("display", "block");
  }
}

//interview section
$("#userText1").click(function(){
  interviewSet1(roundNum);
  roundNum += 1;
});
$("#userText2").click(function(){
  interviewSet2(roundNum);
  roundNum += 1;
});
$("#userText3").click(function(){
  interviewSet3(roundNum);
  roundNum += 1;
});

function interviewSet1(roundNum){
  $("#charText").html(set1.title[roundNum]);
  $(`#userText1`).html(set1.userText1[roundNum]);
  $(`#userText2`).html(set1.userText2[roundNum]);
  $(`#userText3`).html(set1.userText3[roundNum]);
}

function interviewSet2(roundNum){
  $("#charText").html(set2.title[roundNum]);
  $(`#userText1`).html(set2.userText1[roundNum]);
  $(`#userText2`).html(set2.userText2[roundNum]);
  $(`#userText3`).html(set2.userText3[roundNum]);
}

function interviewSet3(roundNum){
  $("#charText").html(set3.title[roundNum]);
  $(`#userText1`).html(set3.userText1[roundNum]);
  $(`#userText2`).html(set3.userText2[roundNum]);
  $(`#userText3`).html(set3.userText3[roundNum]);
}
