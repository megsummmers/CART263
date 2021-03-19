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
