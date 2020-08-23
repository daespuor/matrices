import { Matrix, MatrixCalculator } from './matrices';
import { selectContainer, clearContainer } from './ui-utils';
import { ADD, MULTIPLY } from './constances';

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
  var equalsButton = document.getElementById('equals');

  matrixForm.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    handleReset();
    var rows = document.getElementById('rows').value;
    var cols = document.getElementById('cols').value;
    matrix = Matrix(Number(rows), Number(cols));
    matrix.draw('.content__matrix');
  });
  matrixForm.addEventListener('reset', handleReset);
  addButton.addEventListener('click', function handleAdd() {
    if (matrix) {
      secondMatrix = Matrix(matrix.countRows(), matrix.countCols());
      secondMatrix.draw('.content__second-matrix');
      selectContainer('.content__equals').classList.add('showEquals');
      actionType = ADD;
    }
  });
  multiplyButton.addEventListener('click', function handleMultiply() {
    if (matrix) {
      secondMatrix = Matrix(matrix.countCols(), matrix.countRows());
      secondMatrix.draw('.content__second-matrix');
      selectContainer('.content__equals').classList.add('showEquals');
      actionType = MULTIPLY;
    }
  });
  equalsButton.addEventListener('click', function handleEquals() {
    var matrixCalculator = MatrixCalculator();
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
      default:
        console.log('Invalid Action');
    }
  });
  function handleReset() {
    clearContainer('.content__matrix');
    clearContainer('.content__second-matrix');
    clearContainer('.content__result');
    selectContainer('.content__equals').classList.remove('showEquals');
  }

  function setMatrixContent(matrix, containerID) {
    if (matrix) {
      var contentMatrix = selectContainer(containerID);
      var rowElements = contentMatrix.childNodes;
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
