/**
Code Taker (Turned into Hangman)
Meg Summers

The user will play the game hangman by trying to guess
the randomized word by dragging letters into
the box below. If the letter is found in the word The
program will add the letters where they are placed in
the word. If the user drags a letter that is not found in
the word then the program will add a part to the hangman.
when all 7-8 parts of the hangman are revealed the user loses
if the user gets the word before that, they win.

things to add:
- difficulty
*/
"use strict";

//variables
let possibleWords = ["lung", "eternal", "gasp", "bring", "sentence", "heart", "monarch", "tribe", "revival", "aloof", "nightmare",
"lobby", "mislead", "buffet", "surgeon", "suite", "acquaintance", "aluminium", "deal", "pressure", "write", "length", "rice", "patrol",
"reserve", "garbage", "solve", "camera", "stomach", "strike", "park", "peak", "sword", "inspector", "storage", "energy", "pace",
"quota", "assessment", "truth", "corruption", "core", "world", "concede", "crossing", "lift", "majority", "guard", "roar", "mature",
"slam", "class", "stadium", "draft", "overcharge", "circumstance", "perceive", "agree", "bold", "leave", "coffee", "create", "dream",
"obstacle", "chase", "grounds", "category", "insistence", "ethnic", "presidential", "infinite", "menu", "reptile", "lock", "hospital",
"wealth", "reliance", "hen", "express", "wood", "public", "allow", "glimpse", "depression", "sensitivity", "war", "close", "bite", "advance"]
let word;
let letters = [];
let used = false;
let guessed = 0;
let imageNum = 1;
let difficulty = "Easy";

setWord();

$(`.letter`).one(`mouseover`, function(event) {
  $(this).draggable({
    helper: `clone`
  });
});

$(`#answer`).droppable({
  drop: function(event, ui){
    let letter = ui.draggable.text();
    ui.draggable.draggable(`disable`);
    ui.draggable.addClass(`used`);
    //check if letter matches any of the ones in the word
    for(let i = 0; i < letters.length; i++){
      let hangmanLetter = letters[i];
      if (letter === hangmanLetter){
        //if one matches replace '_' with letter and set to used
        $(`#space${i}`).html(letter);
        used = true;
        //change colours to green for a second
        $(`#answer`).css("border-color", "green");
        $(`#answer`).css("background-color", "DarkSeaGreen");
        //reset colour after a second
        setTimeout(function() {
          $(`#answer`).css("border-color", "black");
          $(`#answer`).css("background-color", "transparent");
        }, 1000);
        guessed += 1;
      }
    }
    //the letter was not used
    if (!used){
      //change colours to red for a second
      $(`#answer`).css("border-color", "red");
      $(`#answer`).css("background-color", "LightCoral");
      //reset colours
      setTimeout(function() {
        $(`#answer`).css("border-color", "black");
        $(`#answer`).css("background-color", "transparent");
      }, 1000);
      //change hangman image
      $(`#hangman${imageNum}`).hide();
      imageNum += 1;
      $(`#hangman${imageNum}`).show();
      $(`#imagecolumn`).effect("shake", {direction: "left", times:5, distance: 20}, 1000);
    }
    //once the user has guessed the right amount of letters
    //bring up dialog prompt and give new word
    if (guessed === letters.length){
      $(`#solved`).dialog(`open`);
      resetGame();
      setWord();
    } else if (imageNum === 7 && difficulty === "Hard"){
      $(`#wordreveal`).append(` ${word}.`)
      $(`#lost`).dialog(`open`);
      resetGame();
      setWord();
    } else if (imageNum === 11 && difficulty === "Easy"){
      $(`#wordreveal`).append(` ${word}.`)
      $(`#lost`).dialog(`open`);
      resetGame();
      setWord();
    }
    //reset used to false
    used = false;
  }
});

//end dialog
$(`#solved`).dialog({
  autoOpen: false,
  buttons: {
    "Why thank you": function(){
      $(this).dialog(`close`);
    }
  }
});

//end dialog
$(`#lost`).dialog({
  autoOpen: false,
  buttons: {
    "...oops": function(){
      $(this).dialog(`close`);
    }
  }
});

//sets up the word to be guessed
function setWord() {
  //randomly selects a word from array
  let randomNum = Math.floor(Math.random() * possibleWords.length);
  let str = possibleWords[randomNum];
  //splits up word and sets to captials
  word = str.toUpperCase();
  letters = word.split("");
  //set number of _ based on word
  for (let i = 0; i < letters.length; i++){
    $(`#answer`).append(`<span id="space${i}" class="spaces">_</span> `);
  }
  $(`.space`)
}

//resets the game
function resetGame() {
  //reset letter spots
  // $(`#space`).text(`_`);
  // $(`#space`).hide();
  $(`#answer`).empty();
  //re-enable dragging
  $(`.used`).draggable("enable")
  //remove the used class
  $(`.letter`).removeClass(`used`);
  //hide current images
  $(`#hangman${imageNum}`).hide();
  //reset variables
  imageNum = 1;
  guessed = 0;
  //show first image
  $(`#hangman${imageNum}`).show();
}

//changes difficulty of game aka num of guesses
function changeDifficulty(){
  //grabs current text in button (default is easy)
  difficulty = $(`#button`).html();
  //chnages button depending on inner text
   if (difficulty === "Easy"){
     difficulty = "Hard";
     $(`#button`).html("Hard");
     //changes colour
     $(`#button`).css("background-color", "LightCoral");
   } else if (difficulty === "Hard"){
     difficulty = "Easy";
     $(`#button`).html("Easy");
     //changes colour
     $(`#button`).css("background-color", "LightGreen");
   }
   console.log(difficulty);
}
