const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let tool = "pen";
let brushSize = 2;
let color = "#000000";
let scale = 1;
let originX = 0;
let originY = 0;

var pointerSettingType = document.getElementById("inputMethod").value;

// Resize canvas to fill window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

document.getElementById('colorPicker').addEventListener('input', (e) => {
  color = e.target.value;
});

document.querySelectorAll('.tool').forEach(btn => {
  btn.addEventListener('click', () => {
    tool = btn.dataset.tool;
  });
});

// Undo functionality
let history = [];
function saveState() {
  history.push(canvas.toDataURL());
}
function undo() {
  if (history.length > 0) {
    const img = new Image();
    img.src = history.pop();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }
}

document.getElementById('undo').addEventListener('click', undo);

canvas.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== pointerSettingType) return;
  saveState();
  drawing = true;
  ctx.beginPath();
  ctx.moveTo((e.offsetX - originX) / scale, (e.offsetY - originY) / scale);
});

canvas.addEventListener('pointermove', (e) => {
  if (!drawing || e.pointerType !== pointerSettingType) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

  ctx.lineTo((e.offsetX - originX) / scale, (e.offsetY - originY) / scale);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo((e.offsetX - originX) / scale, (e.offsetY - originY) / scale);
});

canvas.addEventListener('pointerup', () => (drawing = false));
canvas.addEventListener('pointercancel', () => (drawing = false));

// Save drawing as an image file
document.getElementById('save').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'drawing.png';
  link.click();
});

// Change Input Methods
document.getElementById('inputMethod').addEventListener('click', () => {
  pointerSettingType = document.getElementById("inputMethod").value;
});

// Load the saved drawing from local storage
document.getElementById('load').addEventListener('click', () => {
  const img = new Image();
  img.src = localStorage.getItem('drawing');
  img.onload = () => ctx.drawImage(img, 0, 0);
});

// Image upload functionality
document.getElementById('upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  reader.readAsDataURL(file);
});

// Zoom functionality
canvas.addEventListener('wheel', (e) => {
  const zoomFactor = 1.1;
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  if (e.deltaY < 0) {
    scale *= zoomFactor;
  } else {
    scale /= zoomFactor;
  }

  originX = mouseX - (mouseX - originX) * (scale / (scale / zoomFactor));
  originY = mouseY - (mouseY - originY) * (scale / (scale / zoomFactor));

  ctx.setTransform(scale, 0, 0, scale, originX, originY);
  e.preventDefault();
});
