'use strict';

module.exports.parseBoard = function (board) {
  return board.split('\n').map(function (row) {
    return row.split('').map(function (num) {
      return +num;
    });
  });
};

module.exports.saveEmptyPositions = function (board) {
  var emptyPositions = [];

  // Check every square for a zero
  for (var y = 0; y < board.length; y++) {
    for (var x = 0; x < board[y].length; x++) {
      // If found 0, save the position
      if (board[y][x] === 0) {
        emptyPositions.push([y, x]);
      }
    }
  }

  return emptyPositions;
};
