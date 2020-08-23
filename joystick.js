var robot = require("robotjs");
var five = require("johnny-five")
var board = new five.Board({port: "COM3"});

var mouse;

function joy_move(axis_pos, mouse_pos) {
  // Minimum threshold to count joystick movement
  var joy_min_thresh = 0.02;
  // Factor to move the mouse by
  var joy_move_factor = 10;

  if (axis_pos > joy_min_thresh) {
    return(mouse_pos + joy_move_factor);
  } else if (axis_pos < -joy_min_thresh) {
    return(mouse_pos - joy_move_factor);
  } else {
    return(mouse_pos);
  }
}

board.on("ready", function() {

  // Create a new `joystick` hardware instance.
  var joystick = new five.Joystick({
    pins: ["A0", "A1"] // [ X, Y]
  });

  joystick.on("change", function() {

    mouse = robot.getMousePos();
    var new_x = joy_move(this.x, mouse.x)
    var new_y = joy_move(-this.y, mouse.y)

    console.log("Mouse is at x:" + new_x + " y:" + new_y);

    //Move the mouse to x, y on the screen.
    robot.moveMouse(new_x, new_y);
  });
});
