var robot = require("robotjs");
var five = require("johnny-five")
var board = new five.Board();

var mouse;

board.on("ready", function() {

  // Create a new `joystick` hardware instance.
  var joystick = new five.Joystick({
    // [ X, Y]
    pins: ["A0", "A1"]
  });

  joystick.on("change", function() {
    if (this.x > 0.02 || this.x < -0.02 || this.y > 0.02 || this.y < -0.02) {
      console.log("Joystick");
      console.log("  x : ", this.x);
      console.log("  y : ", this.y);
      console.log("--------------");

      mouse = robot.getMousePos();
      console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
      
      if (this.x > 0.02) {
        var new_x = mouse.x - 1;
      } else if (this.x < -0.02) {
        var new_x = mouse.x + 1;
      } else {
        var new_x = mouse.x;
      }

      if (this.y > 0.02) {
        var new_y = mouse.y - 1;
      } else if (this.y < -0.02) {
        var new_y = mouse.y + 1;
      } else {
        var new_y = mouse.y;
      }

      console.log("Mouse is at x:" + new_x + " y:" + new_y);

      //Move the mouse to x, y on the screen.
      robot.moveMouse(new_x, new_y);
    }
  });
});
