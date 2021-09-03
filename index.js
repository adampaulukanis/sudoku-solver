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

module.exports.checkRow = function (board, row, value) {
  for (var i = 0; i < board[row].length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }

  // No match found
  return true;
};

module.exports.checkColumn = function (board, column, value) {
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }

  // No match found
  return true;
};

module.exports.check3x3Square = function (board, column, row, value) {
  // Save the upper-left corner.
  var columnCorner = 0,
    rowCorner = 0,
    squareSize = 3;

  // Find left-most column
  while (column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }

  // Find upper-most row
  while (row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }

  for (var y = rowCorner; y < rowCorner + squareSize; y++) {
    for (var x = columnCorner; x < columnCorner + squareSize; x++) {
      if (board[y][x] === value) {
        return false;
      }
    }
  }

  // No match found
  return true;
};

module.exports.checkValue = function (board, column, row, value) {
  if (
    this.checkRow(board, row, value) &&
    this.checkColumn(board, column, value) &&
    this.check3x3Square(board, column, row, value)
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports.solvePuzzle = function (board, emptyPositions) {
  // Variables to track our position in the solver
  var limit = 9,
    i,
    row,
    column,
    value,
    found;

  for (i = 0; i < emptyPositions.length; ) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];

    // Try the next value
    value = board[row][column] + 1;

    // A valid number found?
    found = false;

    // Keep trying new values
    while (!found && value <= limit) {
      // Found a valid value?
      if (this.checkValue(board, column, row, value)) {
        found = true;
        board[row][column] = value;
        i++;
        // Not? Try next value
      } else {
        value++;
      }
    }

    // Move back to the previous position
    if (!found) {
      board[row][column] = 0;
      i--;
    }
  }

  // Solution was found!
  board.forEach(function (row) {
    console.log(row.join());
  });

  return board;
};

module.exports.solveSudoku = function (board) {
  var parsedBoard = this.parseBoard(board);
  var emptyPositions = this.saveEmptyPositions(parsedBoard);

  return this.solvePuzzle(parsedBoard, emptyPositions);
};
