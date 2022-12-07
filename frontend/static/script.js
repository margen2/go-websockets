// Get canvas and context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// Set default drawing parameters
context.lineWidth = 2;
context.lineCap = 'round';
context.strokeStyle = '#000000';

// Track if the user is currently drawing
let isDrawing = false;

// Track the user's previous and current positions
let previousPosition = { x: 0, y: 0 };
let currentPosition = { x: 0, y: 0 };

// Add event listeners to the canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

// Set the default cursor to a crosshair
canvas.style.cursor = 'crosshair';

// The startDrawing function is called when the user starts drawing
function startDrawing(event) {
  let rect = canvas.getBoundingClientRect();

  isDrawing = true;
  previousPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
  };
}

// The draw function is called while the user is drawing
function draw(event) {
  if (isDrawing === true) {
    // Get the position of the canvas relative to the viewport
    let rect = canvas.getBoundingClientRect();

    currentPosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
    drawLine(previousPosition, currentPosition);
    previousPosition = currentPosition;
}
}

// The stopDrawing function is called when the user stops drawing
function stopDrawing() {
    isDrawing = false;
}

// The drawLine function draws a line on the canvas
function drawLine(start, end) {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
}

// Get the delete button and add an event listener
const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', clearCanvas);

// The clearCanvas function clears the canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Get the name input field and add an event listener
const nameInput = document.getElementById('name-input');
nameInput.addEventListener('keydown', addName);

// The addName function adds a name to the name list
function addName(event) {
    if (event.key === 'Enter') {
        const name = nameInput.value;
        if (name.trim() !== '') {
            const nameList = document.getElementById('name-list-items');
            const nameItem = document.createElement('li');
            nameItem.textContent = name;
            nameList.appendChild(nameItem);
            nameInput.value = '';
        }
    }
}

// Get the color selector and add an event listener
const colorSelector = document.getElementById('color-selector');
colorSelector.addEventListener('change', setColor);

// The setColor function sets the current drawing color
function setColor(event) {
    context.strokeStyle = event.target.value;
}
