let isPause = true;
let myCanvas;
let saveButton;
let newX = 0;
let p1IdleImage;
cnv = createCanvas(300, 300);

function Idle() {
  img = loadImge()
}

function setup() {
  // put setup code here
  canvas = createCanvas(400, 400);
  saveButton = createButton("Save PNG");
  saveButton.mousePressed(savePng);
}

function draw() {
  // put drawing code here
  // background(220);
  // x, y, diameter(width), diameter(height)
  // ellipse(200, 200, 180, 80);
  // ellipse(400 - 50, 400 - 50, 180, 80);
  // rect(width - 50, 50, 150, 80);
  // rect(50, height - 105, 150, 80);

  if(!isPause){
    background(220);
    ellipse(++newX, heigh/2, 100, 100);
    if(newX >= width){
      newX = 0;
    }
  }

  // if(!isPause){
  //   ellipse(mouseX, mouseY, 80, 80);
  //   ellipse(mouseX - 20, mouseY, 10, 20);
  //   ellipse(mouseX + 20, mouseY, 10, 20);
  // }
  // print("Draw is called");
}

function mouseClicked(){
  if(mouseButton == LEFT){
    isPause = !isPause;
    print("isPause is now = " + isPause);
  }
}

function keyPressed(){
  if(key === 'c'){
    print("Cleared canvas");
    clear();
  }
}

function savePng(){
  save(canvas, "canvas.png");
}