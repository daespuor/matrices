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
  container.innerHTML = '';
}
