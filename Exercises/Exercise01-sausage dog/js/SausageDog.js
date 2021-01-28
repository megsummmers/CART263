class SausageDog extends Animal {
  constructor(x, y, speed, distance, image, sound){
    super(x, y, speed, distance, image);
    this.end = false;
    this.found = false;
    this.bark = sound;
    this.rotationSpeed = 0.25;
  }

  update(){
    //goes through animal's update method
     super.update();
     //once found spin the dog
     if (this.found){
       this.angle += this.rotationSpeed;
     }
  }

  mousePressed(){
    if (mouseX > this.x - this.image.width /2 &&
      mouseX < this.x + this.image.width /2 &&
      mouseY > this.y - this.image.height /2 &&
      mouseY < this.y + this.image.height /2){
      this.found = true;
      //this.end = true;
      this.bark.play();
    }
  }
}
