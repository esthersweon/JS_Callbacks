var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(function (root) {
  var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

  var Board = TicTacToe.Board = function() {
    this.grid = [[],[],[]]
  }

  Board.prototype.won = function(mark) {
    win_possibilities = [
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]],
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]]
    ]

    for(var i = 0; i < 8; i++) {
      var non_marks = false
      for(var j = 0; j < 3; j++) {
        if (mark !== this.grid_helper( win_possibilities[i][j] ) ) {
          non_marks = true;
        }
      }
      if (non_marks === false) {
        return mark;
      }
    }

  };

  Board.prototype.grid_helper = function(arr) {
    return this.grid[arr[0]][arr[1]];
  }

  Board.prototype.empty = function(pos) {
    return (this.grid[pos[0]][pos[1]] === undefined);
  };

  Board.prototype.placeMark = function(pos, mark) {
    this.grid[pos[0]][pos[1]] = mark;
  };

  Board.prototype.inBound = function(pos) {
    return (pos[0] >= 0 && pos[0] <=2 && pos[1] >= 0 && pos[1] <=2);
  }

  var HumanPlayer = TicTacToe.HumanPlayer = function(name) {
    this.name = name;
  };

  HumanPlayer.prototype.promptForMove = function(callback, mark) {
    reader.question("Please select the row: ", function(row) {
      reader.question("Please select the column: ", function(col) {
        if (validMove([row, col])) {
          callback([row, col], mark);
          return;
        } else {
          promptForMove(callback, mark);
        };
      });
    });

    var validMove = function(pos) {
      return (this.game.board.empty(pos) && this.game.board.inBound(pos));
    };
  };

  var Game = TicTacToe.Game = function(player1, player2) {
    this.board = new Board();
    this.players = {x: player1, o: player2};
    this.mark = "x";
  }

  Game.prototype.placeMark = function(pos, mark) {
    this.board.placeMark(pos, mark);
    this.run();
  }

  Game.prototype.run = function() {
    if (this.board.won(this.mark) !== undefined) {
      console.log("The winner is " + this.board.won(this.mark) + "!")
    } else {
      this.players[this.mark].promptForMove(this.placeMark, this.mark);
      this.mark = (this.mark === "o" ? "x" : "o");
    }
  }

  game = new Game(new HumanPlayer("Bob"), new ComputerPlayer("Robot Bob"));
  game.run()

})(this);