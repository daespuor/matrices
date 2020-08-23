"use strict";

var _matrices = require("./matrices");

var matrixCalculator = (0, _matrices.MatrixCalculator)();
var matrix = (0, _matrices.Matrix)(3, 3);
var matrix1 = (0, _matrices.Matrix)(3, 2);
var matrix2 = (0, _matrices.Matrix)(5, 5);
matrix.setContent([[22, 0, 2], [22, 0, 6], [2, 3, 10]]);
matrix1.setContent([[2, 'x'], [10, 1], [-1, 0]]);
matrix2.setContent([[5, -2, 10, 1, 1], [22, 0, 0, 2, 56], [22, 0, 0, 6, 10], [2, 1, 3, 10, -5], [2, 1, -3, -10, 5]]); // var result = matrixCalculator.multiplyByScalar(matrix, -1);
// result.draw();
// var resultT = matrixCalculator.transpose(matrix);
// resultT.draw();

var result = matrixCalculator.multiply(matrix, matrix1);
result.draw();
console.log(matrixCalculator.getDeterminant(matrix2));