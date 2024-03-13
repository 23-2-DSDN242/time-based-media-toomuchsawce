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

  // count vertical bars (representing hours)
  let totalBars = 12;

  // hoursLoaded based on obj.hours
  hoursLoaded = obj.hours % totalBars;

  // count horizontal bars (representing hours)
  for (let i = 0; i < totalBars; i++) {
    // x-coordinate of the vertical bar
    let x = 70 + i * 70;

    // draw vertical bar
    noFill(); // No fill for the vertical bar
    stroke(0); // White stroke
    strokeWeight(4); // Increased stroke weight
    rect(x, 90, 35, 300); // Vertical bars start from y=90 and have a height of 300

    // determine if this bar should be fully loaded based on the hours
    let isFullyLoaded = i < hoursLoaded;

    if (isFullyLoaded) {
      // loop to draw each smaller rectangle horizontally for the current vertical bar
      for (let j = 0; j < 60; j++) { // 60 horizontal bars for each vertical bar
        // y-coordinate of the smaller rectangle
        let y = 390 - (j * 5); // start from the bottom and go upwards

        // calculate color based on milliseconds
        let colorIndex = map(j, 0, 60, 0, 255);
        let lerpedColor = lerpColor(color(255, colorIndex, 203), color(174, colorIndex, 184), obj.millis / 999);

        // fill and stroke properties
        fill(lerpedColor); 
        stroke(0); // White stroke
        strokeWeight(2); // Increased stroke weight

        // draw smaller rectangle
        rect(x, y, 35, 5); // each horizontal bar has a width of 35
      }
    }
  }

  // draw the bar representing minutes
  // calculate the x-coordinate of the vertical bar for minutes
  let x = 70 + hoursLoaded * 70;

  // calculate the number of smaller rectangles to make up the vertical rectangle
  let numRects = 60;

  // calculate the height of each smaller rectangle
  let rectHeight = 300 / numRects;

  // loop to draw each smaller rectangle horizontally for the current vertical bar
  for (let j = 0; j < numRects; j++) {
    // calculate the y-coordinate of the smaller rectangle
    let y = 390 - (j * rectHeight); // Start from the bottom and go upwards

    // check if the current smaller rectangle should be loaded
    let shouldDrawRect = j < (obj.minutes % 60);

    if (shouldDrawRect) {
      // calculate color based on milliseconds
      let colorIndex = map(j, 0, 60, 0, 255);
      let lerpedColor = lerpColor(color(255, colorIndex, 203), color(174, colorIndex, 184), obj.millis / 999);

      // fill and stroke properties
      fill(lerpedColor);
      stroke(0); // White stroke
      strokeWeight(2); // Increased stroke weight

      // draw smaller rectangle
      rect(x, y, 35, rectHeight);
    }
  }

  // seconds and milliseconds top left
  fill(174, 69, 184); // purple 
  textSize(32); // text size
  textAlign(LEFT, TOP);
  textLeading(36); // line height
  textFont("Digital-7"); // digital font
  let secondsStr = nf(obj.seconds, 2); // seconds 
  let millisStr = nf(obj.millis, 3); // milliseconds 
  text(secondsStr + ':' + millisStr, 20, 20); // display seconds and milliseconds

  // update loaded bars based on the current time
  if (obj.minutes % 60 === 0 && minutesLoaded === 0) {
    minutesLoaded = 1; // start loading the next minute's bar
  } else if (obj.minutes % 60 === 0 && minutesLoaded === 1) {
    hoursLoaded++; // increment hours loaded when a new hour starts
    minutesLoaded = 0; // reset the minutes loaded
  }

  // check if an alarm is set and if it should go off
  if (obj.seconds_until_alarm >= 0 && obj.seconds_until_alarm <= 0.5) {
    alarmSounding = true; // Set alarm flag to true
  }

  // alarm message
  if (alarmSounding) {
    fill(255, 0, 0); // Red color for alarm message
    textSize(24); // Text size
    textAlign(CENTER); // Center alignment
    text("Alarm!", width / 2, height - 20); // Display alarm message at the bottom of the canvas
  }
}