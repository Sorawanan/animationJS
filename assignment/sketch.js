// Rain drop
var drop = []
// Wave for ocean wave
var wave;
// boat
var boat;
// Wave movement
var yoff = 0;
//declares variable for the slider object
var slider;
// lightning  
let Thunder;
var xlightning1 = 0;
var ylightning1 = 0;
var xlightning2 = 0;
var ylightning2 = 0;

function setup() {
  createCanvas(800, 400);
  bg = loadImage("Img/background.png");
  for(var i = 0; i < 200; i++){
    drop[i] = new Drop();
  }

  angleMode(RADIANS);
  wave = new Wave(350);
  boat = new Boat(0, 320);
  slider = createSlider(0.1, 1.5, 0.1, 0.01);

  drawBackground(); 
  xlightning2 = 0;
  ylightning2 = height / 2;
}

function draw() {
  // set background to gray
  background(bg);
  for(var i = 0; i < 200; i++){
    drop[i].show();
    drop[i].update();
  }

  // Display boat and wave and lightning
  boat.display();
  boat.update();
  wave.update();
  Lightning();
}

function drawBackground() {
  for (var i = 0; i < 950; i++) {
    stroke(65);
    line(0, i, width, i);
  }
}

// Function Lightning
function Lightning(){
  for(var i = 0; i < 8; i++){
    xlightning1 = xlightning2;
    ylightning1 = ylightning2;
    //random of 
    xlightning2 = xlightning1 + int(random(-30, 30));
    ylightning2 = ylightning1 + int(random(-10, 30));
    //Set the stroke width used for the line.
    strokeWeight(random(1, 3));
    //The slit between the two strokes is sharp and sharp. 
    //unless the angle is lower than the "angle", in which case The sharp bit will cut to the "slant".
    strokeJoin(MITER);
    line(xlightning1, ylightning1, xlightning2, ylightning2);

    if ((xlightning2>width)|(xlightning2<0)|(ylightning2>height)|(ylightning2<0)) {
      clear();
      drawBackground();
      xlightning2 = int(random(0, width));
      ylightning2 = 0;
      // R, G & B integer values with white
      stroke(500);
    }
  }
}

// Funciton
function Drop(){
  this.x = random(0, width);
  this.y = random(0, -height);

  // show rain drop
  this.show = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(1, 5), random(1, 5));
  }

  this.update = function(){
    this.speed = random(1, 5);
    this.gravity = 1.05;
    this.y = this.y + this.speed * this.gravity;

    if(this.y > height){
      this.y = random(0, -height);
      this.gravity = 0;
    }
  }
}

// Class Boat
class Boat {
  constructor(x, y){
    this.x = x;
    this.y = y;

    this.angle = 0;
  }

  update() {
    //incress boat position
    this.x += 1
  }
  
  display(){
    push();

    translate(this.x, this.y);
    fill(0, 255, 0);
    ellipse(0, 0, 20);

    rotate(this.angle);

  
    noStroke();
    fill('red');
    quad(-145, -40, 190, -50, 100, 50, -100, 50);

    fill(55);
    quad(-138, -26, 168, -26, 100, 40, -100, 45);

    fill('white');
    quad(-137, -22.5, 166, -22.5, 100, 40, -100, 45);

    
    quad(38, 31, 86, 20, 69, 63, 30, 76);

    fill(55);
    quad(-136, -20, 163, -20, 105, 50, -100, 50);
    
    noStroke();
    fill('white');
    triangle(-120, -75, -5, -85, 20, -250);

    noStroke();
    fill(242);
    triangle(-60, -80, -5, -85, 20, -250);

    noStroke();
    fill('white');
    triangle(110, -55, 20, -60, 20, -250);

    noStroke();
    fill(242);
    triangle(45, -60, 20, -60, 20, -250);
    
    pop();
  }
}

// Class Wave
class Wave{
  constructor(y){
    this.y = y;
  }

  update(){
    // begins drawing of wave shape on the canvas
    beginShape();
    // displays ocean waves as a dark blue color without strokes
    noStroke();
    fill(55, 100, 195);

    // declares variable for x value offset of wave movement
    let xoff = 0;

    // for loop to create wave from and movement
    for(let x = 0; x <= width; x++){
      //increases intensity an height of wave along with slider adjustment
      let y = this.y - noise(xoff, yoff) * 120 * slider.value();
      vertex(x, y);
      boat.angle = map(sin(y), -6, 6, -0.08, 0.08);
      //increments x position offset of wave from and movement
      xoff += 0.01;
    }
    //increments y position offset of wave form and movement
    yoff += 0.01;
    vertex(width, height);
    vertex(0, height);

    //end drawing of wave shape on the canvas
    endShape(CLOSE);
    
    let boatxOff = boat.x * 0.01;

    //increases intensity and height of boat along with slider adjustment
    boat.y = this.y - noise(boatxOff, yoff) * 120 * slider.value();
  }
}