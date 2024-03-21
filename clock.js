/*
 * draw a clock on a 960x500 canvas
 */
let hoursLoaded = 0; // track hours loaded
let minutesLoaded = 0; // track minutes loaded
let alarmSounding = false; // track alarm sounding
let alarmColor; // alarm text color

function draw_clock(obj) {
  // draw clock based on obj values:
  //    obj.hours: 0-23
  //    obj.minutes: 0-59
  //    obj.seconds: 0-59
  //    obj.millis: 0-999
  //    obj.seconds_until_alarm:
  //        < 0: no alarm set
  //        = 0: alarm going off
  //        > 0: seconds until alarm goes off
  background(0); // white background
  let totalBars = 12;
  let barSpacing = 47; // spacing between loaded bars

  // vertical bars (preload)
  for (let i = 0; i < totalBars; i++) {
    let x = 70 + i * barSpacing;
    noFill();
    noStroke();
    strokeWeight(4);
    rect(x, 90, 35, 300);
    let isFullyLoaded = i < obj.hours % totalBars;
    if (isFullyLoaded) {
      drawBars(x, 390, 60, obj.millis);
    }
  }

  // horizontal bars (preload)
  let x = 70 + obj.hours % totalBars * barSpacing; 
  drawBars(x, 390, 60, obj.millis, obj.minutes % 60);

  // song bar (based on minute)
  let songBarHeight = 5; // bar height
  let songBarY = 450; // bar Y position
  let songBarX = 165; // bar X position
  let songBarBackgroundColor = color(34, 35, 38); // bar background color
  let minuteDurationSeconds = 60;
  // progress within minute
  let progressWithinMinute = (obj.seconds + obj.millis / 1000) / minuteDurationSeconds;
  // filled width of songbar
  let filledWidth = map(progressWithinMinute, 0, 1, 0, width - 400);

  // background of songbar
  fill(songBarBackgroundColor);
  noStroke();
  rectMode(CORNER); // set rect mode to CORNER
  rect(songBarX, songBarY, width - 400, songBarHeight); // background progress bar

  // songbar gradient colors
  let gradientColorStart = color(255, 203, 174); // start color
  let gradientColorEnd = color(174, 255, 203);   // end color

  // filling part of songbar
  let lerpedColor = lerpColor(gradientColorStart, gradientColorEnd, progressWithinMinute);
  fill(lerpedColor);
  rect(songBarX, songBarY, filledWidth, songBarHeight); // filled part

  // songbar circle
  let circleSize = 10; // circle size
  let endOfBarX = songBarX + filledWidth;
  fill(255);
  noStroke();
  ellipse(endOfBarX, songBarY + songBarHeight / 2, circleSize, circleSize); // circle

  // display seconds and milliseconds
  fill(174, 69, 184);
  textSize(32);
  textLeading(36);
  textFont("Digital-7");
  let secondsStr = nf(obj.seconds, 2);
  let millisStr = nf(obj.millis, 3);
  let textX = 108;
  let textY = 462;
  text(secondsStr + ':' + millisStr, textX, textY); // time

  // play button
  let playButtonSize = 40; // button size
  let playButtonX = songBarX + (width - 400 - playButtonSize) / 2;
  let playButtonY = songBarY - playButtonSize - 30;
  fill(255); // button circle color
  ellipseMode(CENTER);
  ellipse(playButtonX + playButtonSize / 2, playButtonY + playButtonSize / 2, playButtonSize + 10, playButtonSize + 10); // circle around button

  // play button triangle
  let triangleSize = 20;
  let triangleX1 = playButtonX + playButtonSize / 1.7 - triangleSize / 2;
  let triangleY1 = playButtonY + playButtonSize / 2 - triangleSize / 2;
  let triangleX2 = playButtonX + playButtonSize / 2 + triangleSize / 2;
  let triangleY2 = playButtonY + playButtonSize / 2;
  let triangleX3 = playButtonX + playButtonSize / 1.7 - triangleSize / 2;
  let triangleY3 = playButtonY + playButtonSize / 2 + triangleSize / 2;
  fill(0);
  triangle(triangleX1, triangleY1, triangleX2, triangleY2, triangleX3, triangleY3); // triangle

  // next song arrow (right)
  let arrowSize = 15;
  let arrowX = playButtonX + playButtonSize + 20;
  let arrowY = playButtonY + playButtonSize / 2;
  let arrowTipX = arrowX + arrowSize;
  let arrowTipY = arrowY;
  let arrowBaseX = arrowX;
  let arrowBaseY1 = arrowY - arrowSize / 2;
  let arrowBaseY2 = arrowY + arrowSize / 2;
  fill(225);
  triangle(arrowTipX, arrowTipY, arrowBaseX, arrowBaseY1, arrowBaseX, arrowBaseY2); // arrow

  // rectangle for next song arrow (right)
  let rectangleWidth = 5;
  let rectangleHeight = 20;
  let rectangleX = arrowTipX - 2;
  let rectangleY = arrowTipY - rectangleHeight / 2;
  fill(225)
  rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight); // rectangle

  // next song arrow (left)
  arrowX = playButtonX - 20;
  arrowTipX = arrowX - arrowSize;
  arrowBaseX = arrowX;
  fill(225);
  triangle(arrowTipX, arrowTipY, arrowBaseX, arrowBaseY1, arrowBaseX, arrowBaseY2); // arrow (mirrored)

  // rectangle for next song arrow (left)
  rectangleX = arrowTipX -3;
  fill(225);
  rect(rectangleX, rectangleY, rectangleWidth, rectangleHeight); // rectangle (mirrored)

// update loaded bars based on the current time
if (obj.minutes % 60 === 0 && minutesLoaded === 0) {
minutesLoaded = 1;
} else if (obj.minutes % 60 === 0 && minutesLoaded === 1) {
hoursLoaded++;
minutesLoaded = 0;
}

 // alarm message with flash
 if (obj.seconds_until_alarm === 0) {
  alarmSounding = true;
}

// wake up when alarm is on
if (alarmSounding) {
  let brightness = map(sin(obj.millis * 0.01), -1, 1, 100, 255);
  fill(255, brightness);
  textSize(30);
  textFont("Digital-7");
  textAlign(CENTER);
  text("WAKE UP", playButtonX + playButtonSize / 2, playButtonY - 32);
} else {
  // inactive when alarm is not on
  fill(255);
  textSize(30);
  textFont("Digital-7");
  textAlign(CENTER);
  text("ALARM INACTIVE", playButtonX + playButtonSize / 2, playButtonY - 30);
}

// audiospectrum bars
function drawBars(x, startY, numBars, millis, loadedBars = numBars) {
  let totalHeight = 260;
  let barHeight = totalHeight / numBars;
  let barX = 95;
  let startYOffset = 222;
  for (let j = 0; j < numBars; j++) {
    let y = startYOffset - (j - 16.5) * barHeight; 
    let isLoaded = j < loadedBars;
    if (isLoaded) {
      let colorIndex = map(j, 0, numBars, 0, 255);
      let lerpedColor = lerpColor(color(255, colorIndex, 203), color(174, colorIndex, 184), millis / 999);
      fill(lerpedColor);
      stroke(0);
      strokeWeight(2);
      rect(x + barX, y, 40, barHeight);
    }
  }
}
}

