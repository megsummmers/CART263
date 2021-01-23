class Animal {
  constructor(x, y, image){
    this.x = x;
    this.y = y;
    this.image = image;

    this.angle = 0;
  }

//updates image each frame
  update() {
    this.display();
  }

//displays dog images and sets angle
  display(){
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0);
    pop();
  }
}
