function Clock() {
};

Clock.prototype.run = function() {
  var date = new Date();
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

  var tick = function() {
    console.log(hours + ":" + minutes + ":" + seconds);
    seconds += 5;

    if(seconds >= 60) {
      seconds -= 60;
      minutes += 1;
      if(minutes >= 60) {
        minutes -= 60;
        hours += 1;
        if(hours >= 24) {
          hours -=24;
        }
      }
    }
  };

  setInterval(tick, 5000);
};

var clock = new Clock();
clock.run()

// var setInterval = function (f, time) {
//   f();
//   setTimeout(function() { setInterval(f,time) }, time)
// }