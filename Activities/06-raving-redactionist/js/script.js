/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let $secrets;

setup();

function setup() {
  //saves all secrets to var and adds click listener
  $secrets = $(`.secret`);
  $secrets.on(`click`, redact);
  //reveals secrets every 500 milliseconds
  setInterval(revelation, 500);
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
