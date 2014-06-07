var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Tower = Hanoi.Tower = function (arr) {
    this.stack = arr;
  }

  Tower.prototype.removeDisc = function() {
    var disc = this.stack.pop()
    return disc;
  };

  Tower.prototype.addDisc = function(disc) {
    this.stack.push(disc);
  };



  var Game = Hanoi.Game = function() {
    var game = this;
    var board = [];
    board[0] = new Tower([3, 2, 1]);
    board[1] = new Tower([]);
    board[2] = new Tower([]);

    game.play = function() {
      if (board[2].stack.length === 3) {
        console.log("You've won!");
        return;
      }

      for(var i = 0; i < 3; i++) {
        console.log(board[i].stack)
    }

      reader.question("What pile would you like to move from?  ", function(res1) {
        reader.question("What pile would you like to move to?  ", function(res2) {

          var towerFrom = board[res1-1];
          var towerTo = board[res2-1];

          if ((res1 <= 0 || res1 >= 4) || (res2 <= 0 || res2 >= 4)) {
            console.log("Not a valid tower");
          } else if (towerFrom.stack.length === 0) {
            console.log("Empty tower!");
          } else if (towerTo.stack.length === 0){
            towerTo.addDisc(towerFrom.removeDisc());
          } else if(towerFrom.stack.slice(-1) > towerTo.stack.slice(-1)) {
            console.log("Can't stack larger disc on top of smaller disc");
          } else {
            towerTo.addDisc(towerFrom.removeDisc());
          }

          game.play();

        })
      })
    }
  }

  var game = new Hanoi.Game();
  game.play();
})(this);