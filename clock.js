/*
 * use p5.js to draw a clock on a 960x500 canvas
 */
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
  background(0); //  beige

  rect(70, 90, 35, 300);
  rect(140, 90, 35, 300);
  rect(210, 90, 35, 300);
  rect(280, 90, 35, 300);
  rect(350, 90, 35, 300);
  rect(420, 90, 35, 300);
  rect(490, 90, 35, 300);
  rect(560, 90, 35, 300);
  rect(630, 90, 35, 300);
  rect(700, 90, 35, 300);
  rect(770, 90, 35, 300);
  rect(840, 90, 35, 300);


}
