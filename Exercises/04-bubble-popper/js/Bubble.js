class Bubble {
  constructor(x, y, size, vy, type, bomb){
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 0;
    this.vy = vy;
    this.type = type;
    this.types = ["good", "bad"];
    //bomb image
    this.bomb = bomb
  }

  //resets bubble to the bottom of the screen
  reset(){
    //reset position
    this.x = random(width);
    this.y = height + this.size/2;
    //change type
    this.type = random(this.types);
  }

  //moves bubble based on velocity
  move(){
    this.x += this.vx;
    this.y += this.vy;
  }

  //displays the bubble
  display(){
    push();
    //changes colour based on bubble type
    if(this.type === "bad"){
      image(this.bomb, this.x -this.size/4, this.y -this.size/4, this.size/2, this.size/2);
      fill(225, 60, 60, 125);
      stroke(255, 220, 220, 175);
    } else {
      fill(60, 175, 225, 175);
      stroke(220, 235, 255, 175);
    }
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
