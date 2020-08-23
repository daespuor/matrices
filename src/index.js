import { Matrix, MatrixCalculator } from './matrices';
import {
  selectContainer,
  clearContainer,
  createInputField,
  getInputValue,
  showErrorDialog,
  hideErrorDialog,
} from './ui-utils';
import { ADD, MULTIPLY, MULTIPLY_BY_SCALAR } from './constants';

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
      matrix = Matrix(Number(rows), Number(cols));
      matrix.draw('.content__matrix');
    } catch (error) {
      showErrorDialog(error.message);
    }
  });
  closeDialog.addEventListener('click', hideErrorDialog);
  matrixForm.addEventListener('reset', handleReset);
  addButton.addEventListener('click', function handleAdd() {
    try {
      if (matrix) {
        secondMatrix = Matrix(matrix.countRows(), matrix.countCols());
        secondMatrix.draw('.content__second-matrix');
        selectContainer('.content__equals__button').classList.add('show');
        actionType = ADD;
      }
    } catch (error) {
      showErrorDialog(error.message);
    }
  });
  multiplyButton.addEventListener('click', function handleMultiply() {
    try {
      if (matrix) {
        secondMatrix = Matrix(matrix.countCols(), matrix.countRows());
        secondMatrix.draw('.content__second-matrix');
        selectContainer('.content__equals__button').classList.add('show');
        actionType = MULTIPLY;
      }
    } catch (error) {
      showErrorDialog(error.message);
    }
  });
  multiplyByScalarButton.addEventListener(
    'click',
    function handleMultiplyByScalar() {
      try {
        if (matrix) {
          createInputField('.content__second-matrix');
          selectContainer('.content__equals__button').classList.add('show');
          actionType = MULTIPLY_BY_SCALAR;
        }
      } catch (error) {
        showErrorDialog(error.message);
      }
    }
  );
  transposeButton.addEventListener('click', function handleTranspose() {
    try {
      var matrixCalculator = MatrixCalculator();
      if (matrix) {
        matrix = setMatrixContent(matrix, '.content__matrix');
        var result = matrixCalculator.getTranspose(matrix);
        clearContainer('.content__second-matrix');
        selectContainer('.content__equals__button').classList.remove('show');
        result.draw('.content__result');
      }
    } catch (error) {
      showErrorDialog(error.message);
    }
  });
  determinantButton.addEventListener('click', function handleDeterminant() {
    try {
      var matrixCalculator = MatrixCalculator();
      if (matrix) {
        matrix = setMatrixContent(matrix, '.content__matrix');
        const result = matrixCalculator.getDeterminant(matrix);
        clearContainer('.content__second-matrix');
        selectContainer('.content__equals__button').classList.remove('show');
        createInputField('.content__result', result);
      }
    } catch (error) {
      showErrorDialog(error.message);
    }
  });
  equalsButton.addEventListener('click', function handleEquals() {
    var matrixCalculator = MatrixCalculator();
    try {
      switch (actionType) {
        case ADD: {
          if (secondMatrix && matrix) {
            matrix = setMatrixContent(matrix, '.content__matrix');
            secondMatrix = setMatrixContent(
              secondMatrix,
              '.content__second-matrix'
            );
            var result = matrixCalculator.add(matrix, secondMatrix);
            result.draw('.content__result');
          }
          break;
        }
        case MULTIPLY: {
          if (secondMatrix && matrix) {
            matrix = setMatrixContent(matrix, '.content__matrix');
            secondMatrix = setMatrixContent(
              secondMatrix,
              '.content__second-matrix'
            );
            var result = matrixCalculator.multiply(matrix, secondMatrix);
            result.draw('.content__result');
          }
          break;
        }
        case MULTIPLY_BY_SCALAR: {
          if (matrix) {
            matrix = setMatrixContent(matrix, '.content__matrix');
            const inputValue = getInputValue('.content__second-matrix');
            var result = matrixCalculator.multiplyByScalar(matrix, inputValue);
            result.draw('.content__result');
          }
          break;
        }
        default:
          console.log('Invalid Action');
      }
    } catch (error) {
      showErrorDialog(error.message);
    }
  });
  function handleReset() {
    clearContainer('.content__matrix');
    clearContainer('.content__second-matrix');
    clearContainer('.content__result');
    selectContainer('.content__equals__button').classList.remove('show');
  }

  function setMatrixContent(matrix, containerID) {
    if (matrix) {
      var matrixContainer = selectContainer(containerID);
      var rowElements = matrixContainer.childNodes;
      var rows = [];
      for (const rowElement of rowElements) {
        var colElements = rowElement.childNodes;
        var cols = [];
        for (const colElement of colElements) {
          var colInput = colElement.childNodes[0];
          cols.push(colInput.value);
        }
        rows.push(cols);
      }
      matrix.setContent(rows);
    }
    return matrix;
  }
})();
