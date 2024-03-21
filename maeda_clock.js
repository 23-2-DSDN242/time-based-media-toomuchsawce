// Update this function to draw you own maeda clock on a 960x500 canvas

let squareCounter = 0;
let squares = [];
let frameCounter = 0;

function draw_clock(obj) {
  background(32);
  fill(255, 255, 0);
  noStroke();

// draw squares
for (let i = 0; i < squares.length; i++) {
  fill(128); // Grey color
  rect(squares[i].x, squares[i].y, squares[i].size, squares[i].size); // Draw the square
}

// squares timing
if (frameCounter % 1 === 0 && squareCounter < 999999) { // Adjust the divisor to control speed
  fill(128); // Grey color
  let x = random(100, 800); // Random x-coordinate
  let y = random(90, 300); // Random y-coordinate
  let size =(15); // Random size between 5 and 15 pixels
  let newSquare = { x: x, y: y, size: size, lifespan: 30 }; // Define newSquare object
  squares.push(newSquare); // Push newSquare into squares array
  squareCounter++;
}

// square lifespans and remove expired squares
for (let i = squares.length - 1; i >= 0; i--) {
  squares[i].lifespan--;
  if (squares[i].lifespan <= 0) {
    squares.splice(i, 1);
  }
}

frameCounter++; // Increment frameCounter

  // First DIGIT
  fill(255, 255, 0);
  noStroke();
  for (let i = 0; i < 9; i++) {
    circle(150, 120 + i * 20, 15);
  }
  describe('first digit');

  // Second DIGIT
  fill(255, 255, 0);
  noStroke();
  for (let o = 0; o < 7; o++) {
    circle(190, 140 + o * 20, 15);
  }
  describe('second digit');

  fill(255, 255, 0);
  noStroke();
  for (let o = 0; o < 7; o++) {
    circle(290, 140 + o * 20, 15);
  }
  describe('second digit');

  fill(255, 255, 0);
  noStroke();
  for (let p = 0; p < 4; p++) {
    circle(210 + p * 20, 120, 15);
  }
  describe('second digit');

  fill(255, 255, 0);
  noStroke();
  for (let p = 0; p < 4; p++) {
    circle(210 + p * 20, 280, 15);
}

// Colon

fill(255, 255, 0);
noStroke();
circle(350, 150, 15);

fill(255, 255, 0);
noStroke();
circle(350, 250, 15);

// Third digit

for (let i = 0; i < 9; i++) {
  circle(430, 120 + i * 20, 15);
}

for (let i = 0; i < 9; i++) {
  circle(530, 120 + i * 20, 15);
}

// Colon

fill(255, 255, 0);
noStroke();
circle(600, 150, 15);

fill(255, 255, 0);
noStroke();
circle(600, 250, 15);

// Fourth digit

fill(255, 255, 0);
noStroke();
for (let o = 0; o < 7; o++) {
  circle(750, 140 + o * 20, 15);
}
describe('second digit');

fill(255, 255, 0);
noStroke();
for (let o = 0; o < 7; o++) {
  circle(650, 140 + o * 20, 15);
}
describe('second digit');

fill(255, 255, 0);
noStroke();
for (let p = 0; p < 4; p++) {
  circle(670 + p * 20, 120, 15);
}
describe('second digit');

fill(255, 255, 0);
noStroke();
for (let p = 0; p < 4; p++) {
  circle(670 + p * 20, 280, 15);

}

for (let i = 0; i < 9; i++) {
  circle(810, 120 + i * 20, 15);
}
}
