class Animal {
  constructor(x, y, speed, distance, image){
    this.x = x;
    this.y = y;
    this.pathEnd = x + distance
    this.pathStart = x;
    this.speed = speed;
    this.distance = distance;
    this.image = image;
    //ending attributes
    this.end = false;
    this.transparency = 255;
    this.found = false;
    //if wrong dog is clicked
    this.clicked = false;
    this.rotationSpeed = 0.25;
    this.angle = 0;
  }

//updates image each frame
  update() {
    if (this.end){
      this.transparency = 100;
    } else if (this.clicked){
      this.angle += this.rotationSpeed;
      if (this.angle === 6.5){
        this.angle = 0;
        this.clicked = false;
      }
    }
    this.move();
    this.display();
  }

  move() {
    //THIS ISN'T WORKING
    if(!this.end){
      this.x = this.x + this.speed;
      if(this.x >= this.pathEnd){
        this.speed = -this.speed;
      } else if (this.x < this.pathStart){
        this.speed = -this.speed;
      }
    }
  }

//displays dog images and sets angle
  display(){
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    tint(255, 255, 255, this.transparency)
    image(this.image, 0, 0);
    pop();
  }

  mousePressed(){
    if (mouseX > this.x - this.image.width /2 &&
      mouseX < this.x + this.image.width /2 &&
      mouseY > this.y - this.image.height /2 &&
      mouseY < this.y + this.image.height /2){
      this.clicked = true;
    }
  }
}
