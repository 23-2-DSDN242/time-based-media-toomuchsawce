/*
 * use p5.js to draw a clock on a 960x500 canvas
 */
let hoursLoaded = 0; // Variable to keep track of the number of hours loaded
let minutesLoaded = 0; // Variable to keep track of the number of minutes loaded
let alarmSounding = false; // Variable to track if the alarm is currently sounding

function draw_clock(obj) {
  // draw your own clock here based on the values of obj:
  //    obj.hours goes from 0-23
  //    obj.minutes goes from 0-59
  //    obj.seconds goes from 0-59
  //    obj.millis goes from 0-999
  //    obj.seconds_until_alarm is:
  //        < 0 if no alarm is set
  //        = 0 if the alarm is currently going off
  //        > 0 --> the number of seconds until alarm should go off
  background(0); // white background
  let totalBars = 12;

  // draw vertical bars for hours
  for (let i = 0; i < totalBars; i++) {
    let x = 70 + i * 70;
    noFill();
    stroke(0);
    strokeWeight(4);
    rect(x, 90, 35, 300);
    let isFullyLoaded = i < obj.hours % totalBars;
    if (isFullyLoaded) {
      drawBars(x, 390, 60, obj.millis);
    }
  }

  // draw horizontal bars for minutes
  let x = 70 + obj.hours % totalBars * 70;
  drawBars(x, 390, 60, obj.millis, obj.minutes % 60);

  // display seconds and milliseconds
  fill(174, 69, 184);
  textSize(32);
  textAlign(LEFT, TOP);
  textLeading(36);
  textFont("Digital-7");
  let secondsStr = nf(obj.seconds, 2);
  let millisStr = nf(obj.millis, 3);
  text(secondsStr + ':' + millisStr, 20, 20);

  // update loaded bars based on the current time
  if (obj.minutes % 60 === 0 && minutesLoaded === 0) {
    minutesLoaded = 1;
  } else if (obj.minutes % 60 === 0 && minutesLoaded === 1) {
    hoursLoaded++;
    minutesLoaded = 0;
  }

  // display alarm message
  alarmSounding = obj.seconds_until_alarm >= 0 && obj.seconds_until_alarm <= 0.5;
  if (alarmSounding) {
    fill(255, 0, 0);
    textSize(24);
    textAlign(CENTER);
    text("Alarm!", width / 2, height - 20);
  }
}

// draw horizontal bars
function drawBars(x, startY, numBars, millis, loadedBars = numBars) {
  let barHeight = 300 / numBars;
  for (let j = 0; j < numBars; j++) {
    let y = startY - j * barHeight;
    let shouldDraw = j < loadedBars;
    if (shouldDraw) {
      let colorIndex = map(j, 0, numBars, 0, 255);
      let lerpedColor = lerpColor(color(255, colorIndex, 203), color(174, colorIndex, 184), millis / 999);
      fill(lerpedColor);
      stroke(0);
      strokeWeight(2);
      rect(x, y, 35, barHeight);
    }
  }
}