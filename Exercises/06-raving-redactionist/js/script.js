/**
Raving Redactionist
Meg Summers

In this game you are tasked with keeping the redacted
parts of the secret doument black as a hacker tries to
reveal the entire sheet. You need to keep the sheet hidden
for a few minutes on one of 3 difficulties (num of paragraphs)

Things to add:
- 3 difficulties (done)
- Timer for the user saving
- Title screen + ending screen
- *Add animation to text
*/

"use strict";

let $secrets;
let difficulty = "none";

//setup();

function setup() {
  //saves all secrets to var and adds click listener
  $secrets = $(`.secret`);
  $secrets.on(`click`, redact);
  //reveals secrets every 500 milliseconds
  if(difficulty != "none"){
    setInterval(revelation, 500);
  }
}

function revelation(){
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal(){
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}

function redact(){
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}

function difficultySelect(choice){
  //div ids
  let menu = document.getElementById('menu');
  let gameplay = document.getElementById('gameplay');
  //paragraphs ids
  let easy = document.getElementById('easy');
  let medium = document.getElementById('medium');
  let hard = document.getElementById('hard');
  //sets chosen difficulty
  difficulty = choice;
  //hides paragraphs depending on chosen difficulty
  if (difficulty === "easy"){
    medium.style.display = "none";
    hard.style.display = "none";
  } else if (difficulty === "medium"){
    hard.style.display = "none";
  }
  //hide menu and show gameplay div
  gameplay.style.display = "inline";
  menu.style.display = "none";
  //start up the revealing
  setup();
}
