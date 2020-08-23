// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/ui-utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUIRow = createUIRow;
exports.createUICol = createUICol;
exports.selectContainer = selectContainer;
exports.clearContainer = clearContainer;
exports.createInputField = createInputField;
exports.getInputValue = getInputValue;
exports.showErrorDialog = showErrorDialog;
exports.hideErrorDialog = hideErrorDialog;

function createUIRow() {
  var contentRow = document.createElement('div');
  contentRow.classList.add('row');
  return contentRow;
}

function createUICol(value) {
  var contentCol = document.createElement('div');
  contentCol.classList.add('col');
  var colInput = document.createElement('input');
  colInput.value = value;
  contentCol.appendChild(colInput);
  return contentCol;
}

function selectContainer(containerID) {
  return document.querySelector(containerID);
}

function clearContainer(containerID) {
  var container = document.querySelector(containerID);

  if (container) {
    container.innerHTML = '';
  }
}

function createInputField(containerID) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var inputField = document.createElement('input');
  var container = document.querySelector(containerID);
  inputField.value = value;

  if (container) {
    clearContainer(containerID);
    container.appendChild(inputField);
  }

  return container;
}

function getInputValue(containerID) {
  var matrixContainer = selectContainer(containerID);

  if (matrixContainer) {
    var inputElement = matrixContainer.childNodes[0];
    return inputElement.value;
  } else {
    return 0;
  }
}

function showErrorDialog(error) {
  var errorDialog = document.querySelector('.error');

  if (errorDialog) {
    var section = errorDialog.querySelector('section');

    if (section) {
      section.innerHTML = "<p>".concat(error, "</p>");
    }

    errorDialog.classList.add('show');
  }
}

function hideErrorDialog() {
  var errorDialog = document.querySelector('.error');

  if (errorDialog) {
    errorDialog.classList.remove('show');
  }
}
},{}],"src/matrices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix = Matrix;
exports.MatrixCalculator = MatrixCalculator;

var _uiUtils = require("./ui-utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//This module manage the modifications over the matrix content
function Matrix(rowsNumber, colsNumber) {
  if (isNaN(rowsNumber) || isNaN(colsNumber)) {
    throw new Error('Rows and Columns must be numbers');
  }

  if (rowsNumber <= 0 || colsNumber <= 0) {
    throw new Error('Rows and Columns must be greater than cero');
  }

  var columns = new Array(colsNumber).fill(0);
  var content = new Array(rowsNumber).fill(columns); //Methods below are closed over content variable

  var publicAPI = {
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

      content = inputContent.map(function (row) {
        return row.map(function (col) {
          return Number(col);
        });
      });
    },
    draw: function draw(containerID) {
      if (containerID) {
        (0, _uiUtils.clearContainer)(containerID);
        var contentMatrix = (0, _uiUtils.selectContainer)(containerID);

        var _iterator2 = _createForOfIteratorHelper(this.getContent()),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var row = _step2.value;
            var contentRow = (0, _uiUtils.createUIRow)();

            var _iterator3 = _createForOfIteratorHelper(row),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var col = _step3.value;
                var contentCol = (0, _uiUtils.createUICol)(col);
                contentRow.appendChild(contentCol);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            contentMatrix.appendChild(contentRow);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    },
    print: function print() {
      console.log(content);
    }
  };
  return publicAPI;
} //This module manage the operations with matrices


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

      var _iterator4 = _createForOfIteratorHelper(matrix1.entries()),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              rowIndex = _step4$value[0],
              row = _step4$value[1];

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
        _iterator4.e(err);
      } finally {
        _iterator4.f();
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

      var _iterator5 = _createForOfIteratorHelper(matrix1.getContent()),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var row = _step5.value;
          var newRow = [];

          for (var _i3 = 0, _Object$keys2 = Object.keys(matrix2.getRow(0)); _i3 < _Object$keys2.length; _i3++) {
            var colIndex = _Object$keys2[_i3];
            var currentColValue = 0;

            var _iterator6 = _createForOfIteratorHelper(row.entries()),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var _step6$value = _slicedToArray(_step6.value, 2),
                    currentColIndex = _step6$value[0],
                    col = _step6$value[1];

                currentColValue += col * matrix2.get(currentColIndex, colIndex);
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }

            newRow.push(currentColValue);
          }

          newContent.push(newRow);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
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

      var _iterator7 = _createForOfIteratorHelper(matrix.getContent()),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var row = _step7.value;
          var newRow = [];

          var _iterator8 = _createForOfIteratorHelper(row),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var col = _step8.value;
              newRow.push(col * scalar);
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }

          newContent.push(newRow);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
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

      var _iterator9 = _createForOfIteratorHelper(matrix.getRow(0).entries()),
          _step9;

      try {
        var _loop = function _loop() {
          var _step9$value = _slicedToArray(_step9.value, 2),
              colIndex = _step9$value[0],
              col = _step9$value[1];

          provisionalContent = [];

          var _iterator10 = _createForOfIteratorHelper(matrix.getContent().entries()),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var _step10$value = _slicedToArray(_step10.value, 2),
                  rowIndex = _step10$value[0],
                  row = _step10$value[1];

              if (rowIndex > 0) {
                provisionalContent.push(row.filter(function (col, currentColIndex) {
                  return currentColIndex != colIndex;
                }));
              }
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }

          provitionalMatrix = Matrix(matrix.countRows() - 1, matrix.countCols() - 1);
          provitionalMatrix.setContent(provisionalContent);
          var sign = colIndex % 2 == 0 ? 1 : -1;
          result += col * _this.getDeterminant(provitionalMatrix) * sign;
        };

        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var provisionalContent;
          var provitionalMatrix;

          _loop();
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
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
},{"./ui-utils":"src/ui-utils.js"}],"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MULTIPLY_BY_SCALAR = exports.MULTIPLY = exports.ADD = void 0;
var ADD = 'ADD';
exports.ADD = ADD;
var MULTIPLY = 'MULTIPLY';
exports.MULTIPLY = MULTIPLY;
var MULTIPLY_BY_SCALAR = 'MULTIPLY_BY_SCALAR';
exports.MULTIPLY_BY_SCALAR = MULTIPLY_BY_SCALAR;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _matrices = require("./matrices");

var _uiUtils = require("./ui-utils");

var _constants = require("./constants");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var matrix;
  var secondMatrix;
  var actionType = '';
  var matrixForm = document.getElementById('matrix_form');
  var addButton = document.getElementById('add');
  var multiplyButton = document.getElementById('multiply');
  var multiplyByScalarButton = document.getElementById('multiply_by_scalar');
  var transposeButton = document.getElementById('get_transpose');
  var determinantButton = document.getElementById('get_determinant');
  var closeDialog = document.querySelector('.error i');
  var equalsButton = document.getElementById('equals');
  matrixForm.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    handleReset();

    try {
      var rows = document.getElementById('rows').value;
      var cols = document.getElementById('cols').value;
      matrix = (0, _matrices.Matrix)(Number(rows), Number(cols));
      matrix.draw('.content__matrix');
    } catch (error) {
      (0, _uiUtils.showErrorDialog)(error.message);
    }
  });
  closeDialog.addEventListener('click', _uiUtils.hideErrorDialog);
  matrixForm.addEventListener('reset', handleReset);
  addButton.addEventListener('click', function handleAdd() {
    try {
      if (matrix) {
        secondMatrix = (0, _matrices.Matrix)(matrix.countRows(), matrix.countCols());
        secondMatrix.draw('.content__second-matrix');
        (0, _uiUtils.selectContainer)('.content__equals__button').classList.add('show');
        actionType = _constants.ADD;
      }
    } catch (error) {
      (0, _uiUtils.showErrorDialog)(error.message);
    }
  });
  multiplyButton.addEventListener('click', function handleMultiply() {
    try {
      if (matrix) {
        secondMatrix = (0, _matrices.Matrix)(matrix.countCols(), matrix.countRows());
        secondMatrix.draw('.content__second-matrix');
        (0, _uiUtils.selectContainer)('.content__equals__button').classList.add('show');
        actionType = _constants.MULTIPLY;
      }
    } catch (error) {
      (0, _uiUtils.showErrorDialog)(error.message);
    }
  });
  multiplyByScalarButton.addEventListener('click', function handleMultiplyByScalar() {
    try {
      if (matrix) {
        (0, _uiUtils.createInputField)('.content__second-matrix');
        (0, _uiUtils.selectContainer)('.content__equals__button').classList.add('show');
        actionType = _constants.MULTIPLY_BY_SCALAR;
      }
    } catch (error) {
      (0, _uiUtils.showErrorDialog)(error.message);
    }
  });
  transposeButton.addEventListener('click', function handleTranspose() {
    try {
      var matrixCalculator = (0, _matrices.MatrixCalculator)();

      if (matrix) {
        matrix = setMatrixContent(matrix, '.content__matrix');
        var result = matrixCalculator.getTranspose(matrix);
        (0, _uiUtils.clearContainer)('.content__second-matrix');
        (0, _uiUtils.selectContainer)('.content__equals__button').classList.remove('show');
        result.draw('.content__result');
      }
    } catch (error) {
      (0, _uiUtils.showErrorDialog)(error.message);
    }
  });
  determinantButton.addEventListener('click', function handleDeterminant() {
    try {
      var matrixCalculator = (0, _matrices.MatrixCalculator)();

      if (matrix) {
        matrix = setMatrixContent(matrix, '.content__matrix');
        var result = matrixCalculator.getDeterminant(matrix);
        (0, _uiUtils.clearContainer)('.content__second-matrix');
        (0, _uiUtils.selectContainer)('.content__equals__button').classList.remove('show');
        (0, _uiUtils.createInputField)('.content__result', result);
      }
    } catch (error) {
      (0, _uiUtils.showErrorDialog)(error.message);
    }
  });
  equalsButton.addEventListener('click', function handleEquals() {
    var matrixCalculator = (0, _matrices.MatrixCalculator)();

    try {
      switch (actionType) {
        case _constants.ADD:
          {
            if (secondMatrix && matrix) {
              matrix = setMatrixContent(matrix, '.content__matrix');
              secondMatrix = setMatrixContent(secondMatrix, '.content__second-matrix');
              var result = matrixCalculator.add(matrix, secondMatrix);
              result.draw('.content__result');
            }

            break;
          }

        case _constants.MULTIPLY:
          {
            if (secondMatrix && matrix) {
              matrix = setMatrixContent(matrix, '.content__matrix');
              secondMatrix = setMatrixContent(secondMatrix, '.content__second-matrix');
              var result = matrixCalculator.multiply(matrix, secondMatrix);
              result.draw('.content__result');
            }

            break;
          }

        case _constants.MULTIPLY_BY_SCALAR:
          {
            if (matrix) {
              matrix = setMatrixContent(matrix, '.content__matrix');
              var inputValue = (0, _uiUtils.getInputValue)('.content__second-matrix');
              var result = matrixCalculator.multiplyByScalar(matrix, inputValue);
              result.draw('.content__result');
            }

            break;
          }

        default:
          console.log('Invalid Action');
      }
    } catch (error) {
      (0, _uiUtils.showErrorDialog)(error.message);
    }
  });

  function handleReset() {
    (0, _uiUtils.clearContainer)('.content__matrix');
    (0, _uiUtils.clearContainer)('.content__second-matrix');
    (0, _uiUtils.clearContainer)('.content__result');
    (0, _uiUtils.selectContainer)('.content__equals__button').classList.remove('show');
  }

  function setMatrixContent(matrix, containerID) {
    if (matrix) {
      var matrixContainer = (0, _uiUtils.selectContainer)(containerID);
      var rowElements = matrixContainer.childNodes;
      var rows = [];

      var _iterator = _createForOfIteratorHelper(rowElements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rowElement = _step.value;
          var colElements = rowElement.childNodes;
          var cols = [];

          var _iterator2 = _createForOfIteratorHelper(colElements),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var colElement = _step2.value;
              var colInput = colElement.childNodes[0];
              cols.push(colInput.value);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          rows.push(cols);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      matrix.setContent(rows);
    }

    return matrix;
  }
})();
},{"./matrices":"src/matrices.js","./ui-utils":"src/ui-utils.js","./constants":"src/constants.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53625" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map