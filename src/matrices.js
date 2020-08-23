import {
  createUIRow,
  createUICol,
  selectContainer,
  clearContainer,
} from './ui-utils';

//This module manage the modifications over the matrix content
export function Matrix(rowsNumber, colsNumber) {
  if (isNaN(rowsNumber) || isNaN(colsNumber)) {
    throw new Error('Rows and Columns must be numbers');
  }
  if (rowsNumber <= 0 || colsNumber <= 0) {
    throw new Error('Rows and Columns must be greater than cero');
  }
  var columns = new Array(colsNumber).fill(0);
  var content = new Array(rowsNumber).fill(columns); //Methods below are closed over content variable
  var publicAPI = {
    entries() {
      return content.entries();
    },
    countRows() {
      return content.length;
    },
    countCols() {
      return content[0].length;
    },
    get(row, col) {
      //using 'this' as the current object
      if (typeof row == 'undefined' || this.countRows() < row || row < 0) {
        throw new Error(`Rows must be between 0 and ${this.countRows() - 1}`);
      }
      if (typeof col == 'undefined' || this.countCols() < col || col < 0) {
        throw new Error(`Cols must be between 0 and ${this.countCols() - 1}`);
      }
      return content[row][col];
    },
    getRow(row) {
      if (typeof row == 'undefined' || publicAPI.countRows() < row || row < 0) {
        throw new Error(
          `Rows must be between 0 and ${publicAPI.countRows() - 1}`
        );
      }
      return content[row];
    },
    getContent() {
      return content;
    },
    setContent(inputContent) {
      if (!Array.isArray(inputContent)) {
        throw new Error('Input content must be an Array');
      }
      if (inputContent.length != this.countRows()) {
        throw new Error('Rows must be equals to initial rows');
      }
      for (const row of inputContent) {
        if (row.length != this.countCols()) {
          throw new Error('Cols must be equals to initial cols');
        }
        var NaNFiltered = row.filter((col) => isNaN(Number(col)));
        if (NaNFiltered.length > 0) {
          throw new Error('Elements must be numbers');
        }
      }
      content = inputContent.map((row) => row.map((col) => Number(col)));
    },
    draw(containerID) {
      if (containerID) {
        clearContainer(containerID);
        var contentMatrix = selectContainer(containerID);
        for (const row of this.getContent()) {
          var contentRow = createUIRow();
          for (const col of row) {
            var contentCol = createUICol(col);
            contentRow.appendChild(contentCol);
          }
          contentMatrix.appendChild(contentRow);
        }
      }
    },
    print() {
      console.log(content);
    },
  };

  return publicAPI;
}

//This module manage the operations with matrices
export function MatrixCalculator() {
  var publicAPI = {
    add(matrix1, matrix2) {
      if (!matrix1 || !matrix2) {
        throw new Error('You must provide two matrices');
      }
      if (!haveSameDimensions(matrix1, matrix2)) {
        throw new Error('Matrices must have the same dimensions');
      }
      var newContent = [];
      for (var [rowIndex, row] of matrix1.entries()) {
        var newRow = [];
        for (const colIndex of Object.keys(row)) {
          const valueMatrix1 = matrix1.get(rowIndex, colIndex);
          const valueMatrix2 = matrix2.get(rowIndex, colIndex);
          newRow.push(valueMatrix1 + valueMatrix2);
        }
        newContent.push(newRow);
      }
      var result = Matrix(matrix1.countRows(), matrix1.countCols());
      result.setContent(newContent);
      return result;
    },
    multiply(matrix1, matrix2) {
      if (!matrix1 || !matrix2) {
        throw new Error('You must provide two matrices');
      }
      if (!numOfRowsEqualsToNumOfColumns(matrix1, matrix2)) {
        throw new Error(
          'Matrix1 must have the same number of rows than columns of Matrix2'
        );
      }
      var newContent = [];
      for (const row of matrix1.getContent()) {
        var newRow = [];
        for (const colIndex of Object.keys(matrix2.getRow(0))) {
          let currentColValue = 0;
          for (const [currentColIndex, col] of row.entries()) {
            currentColValue += col * matrix2.get(currentColIndex, colIndex);
          }
          newRow.push(currentColValue);
        }
        newContent.push(newRow);
      }
      var result = Matrix(matrix1.countRows(), matrix2.countCols());
      result.setContent(newContent);
      return result;
    },
    multiplyByScalar(matrix, scalar) {
      if (!matrix) {
        throw new Error('You must provide a matrix');
      }
      if (isNaN(Number(scalar))) {
        throw new Error('The second parameter must be scalar');
      }
      var newContent = [];
      for (const row of matrix.getContent()) {
        var newRow = [];
        for (const col of row) {
          newRow.push(col * scalar);
        }
        newContent.push(newRow);
      }
      var result = Matrix(matrix.countRows(), matrix.countCols());
      result.setContent(newContent);
      return result;
    },
    getTranspose(matrix) {
      if (!matrix) {
        throw new Error('You must provide a matrix');
      }
      var newContent = [];
      for (let i = 0; i < matrix.countCols(); i++) {
        var newRow = [];
        for (let j = 0; j < matrix.countRows(); j++) {
          newRow.push(matrix.get(j, i));
        }
        newContent.push(newRow);
      }
      var result = Matrix(matrix.countCols(), matrix.countRows());
      result.setContent(newContent);
      return result;
    },
    getDeterminant(matrix) {
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
        return (
          matrix.get(0, 0) * matrix.get(1, 1) -
          matrix.get(0, 1) * matrix.get(1, 0)
        );
      }
      let result = 0;
      for (const [colIndex, col] of matrix.getRow(0).entries()) {
        var provisionalContent = [];
        for (const [rowIndex, row] of matrix.getContent().entries()) {
          if (rowIndex > 0) {
            provisionalContent.push(
              row.filter((col, currentColIndex) => currentColIndex != colIndex)
            );
          }
        }
        var provitionalMatrix = Matrix(
          matrix.countRows() - 1,
          matrix.countCols() - 1
        );
        provitionalMatrix.setContent(provisionalContent);
        const sign = colIndex % 2 == 0 ? 1 : -1;
        result += col * this.getDeterminant(provitionalMatrix) * sign;
      }
      return result;
    },
  };

  function haveSameDimensions(matrix1, matrix2) {
    if (
      matrix1.countRows() != matrix2.countRows() ||
      matrix1.countCols() != matrix2.countCols()
    ) {
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
