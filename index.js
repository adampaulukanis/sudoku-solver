'use strict';

module.exports.parseBoard = function (board) {
  return board.split('\n').map(function (row) {
    return row.split('').map(function (num) {
      return +num;
    });
  });
};
