/* globals background translate rotateX rotateY rotateZ keyIsPressed key millis cylinder loadImage specularMaterial createCanvas WEBGL ambientLight noStroke PI HALF_PI texture plane sin */

let flip = false;
let land = false;
let begin = 0;
const flipHeight = -300;
const flipTime = 3000; // in milliseconds
let headsImg;
let tailsImg;
let sound;
let options = ['<input type="text" id="heads" name="heads" value=""><br>', 'tails'];

function preload() {
  headsImg = loadImage('quarterheads.png');
  tailsImg = loadImage('quarter-tails-MA.png');
  font = loadFont('static/RobotoSlab-Regular.ttf');
  sound = loadSound('coinflip.mp3');
}

function setup() {
  createCanvas(300, 500, WEBGL);
  noStroke();
}

function draw() {
  ambientLight('white');
  background('beige');
  translate(0, 200, 0);

  const time = millis() - begin;

  if (flip) {
    translate(0, sin(time * (PI / flipTime)) * flipHeight, 0);
    rotateX(time / 500);
    rotateZ(time / 75);
    rotateY(time / 1000);
    land = false;
  }

  if (keyIsPressed && key === ' ') {
    flip = true;
    land = false;
    begin = millis();
    sound.play();
    shuffle(options, true);
  }

  if (land) {
    textFont(font);
    textSize(32);
    fill('black');
    text(options[0], -50, -250);
  }

  if (time > flipTime && begin != 0) {
    flip = false;
    land = true;
  }

  rotate(PI);
  coin();
}

 function coin() {
  specularMaterial('silver');
  cylinder(50, 4.8);

  if (land && options[0] == 'heads') {
     noStroke();
     rotateX(HALF_PI);
     translate(0, 0, 2.5);
     texture(headsImg);
     plane(100, 100);

     translate(0, 0, -5);
     texture(tailsImg);
     plane(100, 100);
  } else {
      noStroke();
      rotateX(HALF_PI);
      translate(0, 0, 2.5);
      texture(tailsImg);
      plane(100, 100);

      translate(0, 0, -5);
      texture(headsImg);
      plane(100, 100);
  }
}
