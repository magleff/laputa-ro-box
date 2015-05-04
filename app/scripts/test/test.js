module.exports = function() {
  'use strict';
  function Test() {}

  Test.prototype.draw = function(processing) {

    var width = 6;
    var offset = width / 2;
    var twistZ = 0;
    var originMouseX = 0;
    var originMouseY = 0;
    var absTwistZ = 0;

    var springConstant = 45;
    var mass = 50;
    var restoringForce = 0;
    var acceleration = 0;
    var velocity = 0;
    var friction = 0.75;

    processing.setup = function () {
      processing.size(400, 400);
    };

    processing.draw = function () {
      processing.background(200);
      processing.scale(2);
      processing.pushMatrix();

      processing.text("acceleration: " + acceleration.toFixed(2), 15, 15);
      processing.text("velocity: " + velocity.toFixed(2), 15, 30);
      processing.text("twistZ: " + twistZ.toFixed(2), 15, 45);

      processing.translate(200 / 2, 70);
      processing.strokeWeight(1);

      // Center the shape
      processing.translate(-offset, 0);

      restoringForce = - springConstant * twistZ;
      acceleration = restoringForce / mass - (acceleration * friction);
      velocity += acceleration;
      twistZ += velocity;

      absTwistZ = Math.abs(twistZ) / 10;

      processing.beginShape();
      processing.vertex(0, 0);
      processing.bezierVertex(0, 50 + absTwistZ, 0 - twistZ, 50 + absTwistZ, 0 - twistZ, 50 + absTwistZ);
      processing.vertex(width - twistZ, 50 + absTwistZ);
      processing.bezierVertex(width - twistZ, 50 + absTwistZ, width, 50 + absTwistZ, width, 0);
      processing.vertex(0, 0);
      processing.endShape();

      processing.popMatrix();
    };

    processing.mousePressed = function() {
      originMouseX = processing.mouseX;
      originMouseY = processing.mouseY;
    };

    processing.mouseReleased = function() {
      originMouseX = 0;
      originMouseY = 0;
    };

    processing.mouseDragged = function() {
      twistZ = processing.mouseY - originMouseY;
      velocity = 0;
      acceleration = 0;
    };
  };
  return new Test();
};
