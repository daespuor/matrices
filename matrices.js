"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix = Matrix;
exports.MatrixCalculator = MatrixCalculator;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Matrix(rowsNumber, colsNumber) {
  if (typeof rowsNumber != 'number' || typeof colsNumber != 'number') {
    throw new Error('Rows and Columns must be numbers');
  }

  if (rowsNumber <= 0 || colsNumber <= 0) {
    throw new Error('Rows and Columns must be greater than cero');
  }

  var columns = new Array(colsNumber).fill(0);
  var content = new Array(rowsNumber).fill(columns);
  var publicAPI = {
    //the methods below are closing about content
    entries: function entries() {
      return content.entries();
    },
    countRows: function countRows() {
      return content.length;
    },
    countCols: function countCols() {
      return content[0].length;
    },
    get: function get(row, col) {
      //using 'this' as the current object
      if (typeof row == 'undefined' || this.countRows() < row || row < 0) {
        throw new Error("Rows must be between 0 and ".concat(this.countRows() - 1));
      }

      if (typeof col == 'undefined' || this.countCols() < col || col < 0) {
        throw new Error("Cols must be between 0 and ".concat(this.countCols() - 1));
      }

      return content[row][col];
    },
    getRow: function getRow(row) {
      if (typeof row == 'undefined' || publicAPI.countRows() < row || row < 0) {
        throw new Error("Rows must be between 0 and ".concat(publicAPI.countRows() - 1));
      }

      return content[row];
    },
    getContent: function getContent() {
      return content;
    },
    setContent: function setContent(inputContent) {
      if (!Array.isArray(inputContent)) {
        throw new Error('Input content must be an Array');
      }

      if (inputContent.length != this.countRows()) {
        throw new Error('Rows must be equals to initial rows');
      }

      var _iterator = _createForOfIteratorHelper(inputContent),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var row = _step.value;

          if (row.length != this.countCols()) {
            throw new Error('Cols must be equals to initial cols');
          }

          var NaNFiltered = row.filter(function (col) {
            return isNaN(Number(col));
          });

          if (NaNFiltered.length > 0) {
            throw new Error('Elements must be numbers');
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      content = _toConsumableArray(inputContent);
    },
    draw: function draw() {
      console.log(content);
    }
  };
  return publicAPI;
}

function MatrixCalculator() {
  var publicAPI = {
    add: function add(matrix1, matrix2) {
      if (!matrix1 || !matrix2) {
        throw new Error('You must provide two matrices');
      }

      if (!haveSameDimensions(matrix1, matrix2)) {
        throw new Error('Matrices must have the same dimensions');
      }

      var newContent = [];

      var _iterator2 = _createForOfIteratorHelper(matrix1.entries()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              rowIndex = _step2$value[0],
              row = _step2$value[1];

          var newRow = [];

          for (var _i2 = 0, _Object$keys = Object.keys(row); _i2 < _Object$keys.length; _i2++) {
            var colIndex = _Object$keys[_i2];
            var valueMatrix1 = matrix1.get(rowIndex, colIndex);
            var valueMatrix2 = matrix2.get(rowIndex, colIndex);
            newRow.push(valueMatrix1 + valueMatrix2);
          }

          newContent.push(newRow);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var result = Matrix(matrix1.countRows(), matrix1.countCols());
      result.setContent(newContent);
      return result;
    },
    multiply: function multiply(matrix1, matrix2) {
      if (!matrix1 || !matrix2) {
        throw new Error('You must provide two matrices');
      }

      if (!numOfRowsEqualsToNumOfColumns(matrix1, matrix2)) {
        throw new Error('Matrix1 must have the same number of rows than columns of Matrix2');
      }

      var newContent = [];

      var _iterator3 = _createForOfIteratorHelper(matrix1.getContent()),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var row = _step3.value;
          var newRow = [];

          for (var _i3 = 0, _Object$keys2 = Object.keys(matrix2.getRow(0)); _i3 < _Object$keys2.length; _i3++) {
            var colIndex = _Object$keys2[_i3];
            var currentColValue = 0;

            var _iterator4 = _createForOfIteratorHelper(row.entries()),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _step4$value = _slicedToArray(_step4.value, 2),
                    currentColIndex = _step4$value[0],
                    col = _step4$value[1];

                currentColValue += col * matrix2.get(currentColIndex, colIndex);
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            newRow.push(currentColValue);
          }

          newContent.push(newRow);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var result = Matrix(matrix1.countRows(), matrix2.countCols());
      result.setContent(newContent);
      return result;
    },
    multiplyByScalar: function multiplyByScalar(matrix, scalar) {
      if (!matrix) {
        throw new Error('You must provide a matrix');
      }

      if (isNaN(Number(scalar))) {
        throw new Error('The second parameter must be scalar');
      }

      var newContent = [];

      var _iterator5 = _createForOfIteratorHelper(matrix.getContent()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var row = _step5.value;
          var newRow = [];

          var _iterator6 = _createForOfIteratorHelper(row),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var col = _step6.value;
              newRow.push(col * scalar);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          newContent.push(newRow);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      var result = Matrix(matrix.countRows(), matrix.countCols());
      result.setContent(newContent);
      return result;
    },
    getTranspose: function getTranspose(matrix) {
      if (!matrix) {
        throw new Error('You must provide a matrix');
      }

      var newContent = [];

      for (var i = 0; i < matrix.countCols(); i++) {
        var newRow = [];

        for (var j = 0; j < matrix.countRows(); j++) {
          newRow.push(matrix.get(j, i));
        }

        newContent.push(newRow);
      }

      var result = Matrix(matrix.countCols(), matrix.countRows());
      result.setContent(newContent);
      return result;
    },
    getDeterminant: function getDeterminant(matrix) {
      var _this = this;

      if (!matrix) {
        throw new Error('You must provide a matrix');
      }

      if (!isSquaredMatrix(matrix)) {
        throw new Error('must be a squared matrix');
      }

      if (matrix.countRows() == 1) {
        return matrix.get(0, 0);
      }

      if (matrix.countRows() == 2) {
        return matrix.get(0, 0) * matrix.get(1, 1) - matrix.get(0, 1) * matrix.get(1, 0);
      }

      var result = 0;

      var _iterator7 = _createForOfIteratorHelper(matrix.getRow(0).entries()),
          _step7;

      try {
        var _loop = function _loop() {
          var _step7$value = _slicedToArray(_step7.value, 2),
              colIndex = _step7$value[0],
              col = _step7$value[1];

          provisionalContent = [];

          var _iterator8 = _createForOfIteratorHelper(matrix.getContent().entries()),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var _step8$value = _slicedToArray(_step8.value, 2),
                  rowIndex = _step8$value[0],
                  row = _step8$value[1];

              if (rowIndex > 0) {
                provisionalContent.push(row.filter(function (col, currentColIndex) {
                  return currentColIndex != colIndex;
                }));
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }

          provitionalMatrix = Matrix(matrix.countRows() - 1, matrix.countCols() - 1);
          provitionalMatrix.setContent(provisionalContent);
          var sign = colIndex % 2 == 0 ? 1 : -1;
          result += col * _this.getDeterminant(provitionalMatrix) * sign;
        };

        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var provisionalContent;
          var provitionalMatrix;

          _loop();
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return result;
    }
  };

  function haveSameDimensions(matrix1, matrix2) {
    if (matrix1.countRows() != matrix2.countRows() || matrix1.countCols() != matrix2.countCols()) {
      return false;
    }

    return true;
  }

  function numOfRowsEqualsToNumOfColumns(matrix1, matrix2) {
    if (matrix1.countCols() != matrix2.countRows()) {
      return false;
    }

    return true;
  }

  function isSquaredMatrix(matrix) {
    return matrix.countRows() == matrix.countCols();
  }

  return publicAPI;
}