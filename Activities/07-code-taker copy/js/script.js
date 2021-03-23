/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/
"use strict";

$(`.secret`).one(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
  $(this).draggable({
    helper: `clone`
  });
});

$(`#answer`).droppable({
  drop: function(event, ui){
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    //check if right
    if ($(this).text() === `Theremin`){
      $(`#solved`).dialog(`open`);
    }
  }
});

$(`#solved`).dialog({
  autoOpen: false,
  buttons: {
    "Why thank you": function(){
      $(this).dialog(`close`);
    }
  }
});
// Code goes here
