export function Matrix(rowsNumber, colsNumber) {
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
      if (this.countRows() < row || row < 0) {
        throw new Error(`Rows should be between 0 and ${this.countRows()}`);
      }
      if (this.countCols() < col || col < 0) {
        throw new Error(`Cols should be between 0 and ${this.countCols()}`);
      }
      return content[row][col];
    },
    getRow(row) {
      if (publicAPI.countRows() < row || row < 0) {
        throw new Error(
          `Rows should be between 0 and ${publicAPI.countRows()}`
        );
      }
      return content[row];
    },
    getContent() {
      return content;
    },
    setContent(inputContent) {
      if (!Array.isArray(inputContent)) {
        throw new Error('Input content should be an Array');
      }
      if (inputContent.length != this.countRows()) {
        throw new Error('Rows should be equals to initial rows');
      }
      for (const row of inputContent) {
        if (row.length != this.countCols()) {
          throw new Error('Cols should be equals to initial cols');
        }
      }
      content = [...inputContent];
    },
    draw() {
      console.log(content);
    },
  };

  return publicAPI;
}

export function MatrixCalculator() {
  var publicAPI = {
    add(matrix1, matrix2) {
      if (!haveSameDimensions(matrix1, matrix2)) {
        throw new Error('Matrices should have the same dimensions');
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
      if (!numOfRowsEqualsToNumOfColumns(matrix1, matrix2)) {
        throw new Error(
          'Matrix1 should have the same # of rows than columns of Matrix2'
        );
      }
      var newContent = [];
      for (const row of matrix1.getContent()) {
        var newRow = [];
        for (const colIndex of Object.keys(row)) {
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
      if (isNaN(Number(scalar))) {
        throw new Error('The second parameter should be scalar');
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
    transpose(matrix) {
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
    determinant(matrix) {
      if (!isSquaredMatrix(matrix)) {
        throw new Error('should be a squared matrix');
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
        result += col * this.determinant(provitionalMatrix) * sign;
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
    if (matrix1.countRows() != matrix2.countCols()) {
      return false;
    }
    return true;
  }
  function isSquaredMatrix(matrix) {
    return matrix.countRows() == matrix.countCols();
  }

  return publicAPI;
}
