
var robot = require("robotjs");
var five = require("johnny-five");
var button, led;

// For windows need ({port: "COM3"})
new five.Board().on("ready", function() {

  var state      = false; // Flag to track toggle of button
  var output_key = "audio_pause";
  var input_pin  = 2;
  var led_pin    = 13; // Arduino board LED

  button = new five.Button({
    pin: input_pin, // Want to replace this with user defined var
    isPullup: true
  });

  led = new five.Led(led_pin);

  button.on("down", function(value) {
    led.on();
    if (!state) {
      robot.keyTap(output_key)
    } else {
      state = true;
    }
  });

  button.on("up", function() {
    led.off();
    if (state) {
      robot.keyTap(output_key);
    } else {
      state = false;
    }
  });

});