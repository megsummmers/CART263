/**
Code Taker (Turned into Hangman)
Meg Summers

The user will play the game hangman by trying to guess
the (hopefully) randomized word by dragging letters into
the box below. If the letter is found in the word The
program will add the letters where they are placed in
the word. If the user drags a letter that is not found in
the word then the program will add a part to the hangman.
when all 7-8 parts of the hangman are revealed the user loses
if the user gets the word before that, they win.

things to add:
- Title screen w/instructions and (potentially) difficulty
- end screen for win and lose, lose will show the word
- Add hangman visual and box with all the letters
  - each time a letter is taken out of the box it will
    turn grey and not be draggable again
- create bottom box with feature to show letters when they are
  droppped in the box
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
        document.getElementById(`space${i}`).innerHTML = letter;
        used = true;
        //change colours to green for a second
        document.getElementById("answer").style.borderColor = "green";
        document.getElementById("answer").style.backgroundColor = "DarkSeaGreen";
        //reset colour after a second
        setTimeout(function() {
          document.getElementById("answer").style.borderColor = "black";
          document.getElementById("answer").style.backgroundColor = "transparent";
        }, 1000);
        guessed += 1;
      }
    }
    //the letter was not used
    if (!used){
      //change colours to red for a second
      document.getElementById("answer").style.borderColor = "red";
      document.getElementById("answer").style.backgroundColor = "LightCoral";
      //reset colours
      setTimeout(function() {
        document.getElementById("answer").style.borderColor = "black";
        document.getElementById("answer").style.backgroundColor = "transparent";
      }, 1000);
      //change hangman image
      document.getElementById(`hangman${imageNum}`).style.display = "none";
      imageNum += 1;
      document.getElementById(`hangman${imageNum}`).style.display = "inline";
    }
    //once the user has guessed the right amount of letters
    //bring up dialog prompt and give new word
    if (guessed === letters.length){
      $(`#solved`).dialog(`open`);
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
    document.getElementById(`space${i}`).style.display = "inline";
    document.getElementById(`space${i}`).innerHTML = "_";
  }
  //-------------- TEMPORARY for debug purposes ------------------
  console.log(word);
}

//resets the game
function resetGame() {
  //reset letter spots
  for (let i = 0; i < 9; i++){
    document.getElementById(`space${i}`).style.display = "none";
    document.getElementById(`space${i}`).innerHTML = "";
  }
  //reset alphabet
  $(`.letter`).draggable("enable");
  //remove the used class
  $(`.letter`).removeClass(`found`);
  //reset variables
  imageNum = 0;
  guessed = 0;
}
