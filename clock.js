/*
 * use p5.js to draw a clock on a 960x500 canvas
 */
let hoursLoaded = 0; // Variable to keep track of the number of hours loaded
let minutesLoaded = 0; // Variable to keep track of the number of minutes loaded

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

  // Calculate the total number of vertical bars (representing hours)
  let totalBars = 12;

  // Update hoursLoaded based on obj.hours
  hoursLoaded = obj.hours % totalBars;

  // Draw the bars representing hours
  for (let i = 0; i < totalBars; i++) {
    // Calculate the x-coordinate of the vertical bar
    let x = 70 + i * 70;

    // Draw vertical bar
    noFill(); // No fill for the vertical bar
    stroke(0); // White stroke
    strokeWeight(4); // Increased stroke weight
    rect(x, 90, 35, 300); // Vertical bars start from y=90 and have a height of 300

    // Determine if this bar should be fully loaded based on the hours
    let isFullyLoaded = i < hoursLoaded;

    if (isFullyLoaded) {
      // Loop to draw each smaller rectangle horizontally for the current vertical bar
      for (let j = 0; j < 60; j++) { // Assuming 60 horizontal bars for each vertical bar
        // Calculate the y-coordinate of the smaller rectangle
        let y = 390 - (j * 5); // Start from the bottom and go upwards

        // Calculate color based on milliseconds
        let colorIndex = map(j, 0, 60, 0, 255);
        let lerpedColor = lerpColor(color(255, colorIndex, 203), color(174, colorIndex, 184), obj.millis / 999);

        // Set fill and stroke properties
        fill(lerpedColor); 
        stroke(0); // White stroke
        strokeWeight(2); // Increased stroke weight

        // Draw smaller rectangle
        rect(x, y, 35, 5); // Assuming each horizontal bar has a width of 35
      }
    }
  }

  // Draw the bar representing minutes
  // Calculate the x-coordinate of the vertical bar for minutes
  let x = 70 + hoursLoaded * 70;

  // Calculate the number of smaller rectangles to make up the vertical rectangle
  let numRects = 60;

  // Calculate the height of each smaller rectangle
  let rectHeight = 300 / numRects;

  // Loop to draw each smaller rectangle horizontally for the current vertical bar
  for (let j = 0; j < numRects; j++) {
    // Calculate the y-coordinate of the smaller rectangle
    let y = 390 - (j * rectHeight); // Start from the bottom and go upwards

    // Check if the current smaller rectangle should be loaded
    let shouldDrawRect = j < (obj.minutes % 60);

    if (shouldDrawRect) {
      // Calculate color based on milliseconds
      let colorIndex = map(j, 0, 60, 0, 255);
      let lerpedColor = lerpColor(color(255, colorIndex, 203), color(174, colorIndex, 184), obj.millis / 999);

      // Set fill and stroke properties
      fill(lerpedColor);
      stroke(0); // White stroke
      strokeWeight(2); // Increased stroke weight

      // Draw smaller rectangle
      rect(x, y, 35, rectHeight);
    }
  }

  // Display seconds and milliseconds in the corner in purple digital font
  fill(174, 69, 184); // Purple color
  textSize(32); // Adjust text size
  textAlign(LEFT, TOP);
  textLeading(36); // Adjust line height
  textFont("Digital-7"); // Use digital font
  let secondsStr = nf(obj.seconds, 2); // Format seconds with leading zero if necessary
  let millisStr = nf(obj.millis, 3); // Format milliseconds with leading zeros if necessary
  text(secondsStr + ':' + millisStr, 20, 20); // Display seconds and milliseconds in digital font

  // Update the loaded bars based on the current time
  if (obj.minutes % 60 === 0 && minutesLoaded === 0) {
    minutesLoaded = 1; // Start loading the next minute's bar
  } else if (obj.minutes % 60 === 0 && minutesLoaded === 1) {
    hoursLoaded++; // Increment hours loaded when a new hour starts
    minutesLoaded = 0; // Reset the minutes loaded
  }
}
