export function createUIRow() {
  var contentRow = document.createElement('div');
  contentRow.classList.add('row');
  return contentRow;
}

export function createUICol(value) {
  var contentCol = document.createElement('div');
  contentCol.classList.add('col');
  var colInput = document.createElement('input');
  colInput.value = value;
  contentCol.appendChild(colInput);
  return contentCol;
}

export function selectContainer(containerID) {
  return document.querySelector(containerID);
}

export function clearContainer(containerID) {
  var container = document.querySelector(containerID);
  if (container) {
    container.innerHTML = '';
  }
}

export function createInputField(containerID, value = 0) {
  var inputField = document.createElement('input');
  var container = document.querySelector(containerID);
  inputField.value = value;
  if (container) {
    clearContainer(containerID);
    container.appendChild(inputField);
  }
  return container;
}

export function getInputValue(containerID) {
  var matrixContainer = selectContainer(containerID);
  if (matrixContainer) {
    var inputElement = matrixContainer.childNodes[0];
    return inputElement.value;
  } else {
    return 0;
  }
}

export function showErrorDialog(error) {
  var errorDialog = document.querySelector('.error');
  if (errorDialog) {
    var section = errorDialog.querySelector('section');
    if (section) {
      section.innerHTML = `<p>${error}</p>`;
    }
    errorDialog.classList.add('show');
  }
}

export function hideErrorDialog() {
  var errorDialog = document.querySelector('.error');
  if (errorDialog) {
    errorDialog.classList.remove('show');
  }
}
