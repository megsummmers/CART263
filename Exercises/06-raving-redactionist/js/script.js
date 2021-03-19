/***************************************************************
Raving Redactionist
Meg Summers

In this game you are tasked with keeping the redacted
parts of the secret doument black as a hacker tries to
reveal the entire sheet. You need to keep the sheet hidden
for a few minutes on one of 3 difficulties (num of paragraphs)

Things to add:
- 3 difficulties (done)
- Timer for ending (done)
- Title screen + ending screen (done)
- update look of website (done)
****************************************************************/

"use strict";

let $secrets;
let $redacted;
let difficulty = "none";
let timerMax = 30;
let timerMin = 0;
let timePassed = timerMax;
//constants
const reveal_frequency = 400;
const reveal_probability = 0.1;

function setup() {
  //saves all secrets and redacted parts to var and adds click listener
  $secrets = $(`.secret`);
  $secrets.on(`click`, redact);
  //reveals secrets every 500 milliseconds
  if(difficulty != "none"){
    setInterval(revelation, reveal_frequency);
    setInterval(function(){
      //get timer and redacted elements
      let timerDisplay = document.getElementById('timer');
      $redacted = $(`.redacted`);
      //removes one from timer every second
      timePassed -= 1;
      if ($redacted.length === 0){
        //end countdown
        clearInterval();
        //hide gameplay and show endscreen
        ending('lose');
      } else if (timePassed >= 10){ //displays the current text
        timerDisplay.innerText = `0:${timePassed}`;
      } else if (timePassed >= timerMin && timePassed <= 9){
        timerDisplay.innerText = `0:0${timePassed}`;
      } else if (timePassed <= timerMin){
        //end countdown
        clearInterval();
        //go to end screen
        ending('win');
      }
    }, 1000);
  }
}

function revelation(){
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal(){
  let r = Math.random();
  if (r < reveal_probability) {
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
    //set all non-used redacts to revealed
    $(`.medium`).each(function(medium){
      $(this).removeClass(`redacted`);
      $(this).addClass(`revealed`);
    });
    $(`.hard`).each(function(hard){
      $(this).removeClass(`redacted`);
      $(this).addClass(`revealed`);
    });
  } else if (difficulty === "medium"){
    hard.style.display = "none";
    //set all non-used redacts to revealed
    $(`.hard`).each(function(hard){
      $(this).removeClass(`redacted`);
      $(this).addClass(`revealed`);
    });
  }
  //hide menu and show gameplay div
  gameplay.style.display = "inline";
  menu.style.display = "none";
  //start up the revealing
  setup();
}

function ending(results){
  //hide gameplay and show endscreen
  let gameplay = document.getElementById('gameplay');
  let win = document.getElementById('win');
  let lose = document.getElementById('lose');
  //change the div
  if (results === 'win'){
    gameplay.style.display = "none";
    win.style.display = "inline";
    lose.style.display = "none";
  } else if (results === 'lose'){
    gameplay.style.display = "none";
    win.style.display = "none";
    lose.style.display = "inline";
  }
}
