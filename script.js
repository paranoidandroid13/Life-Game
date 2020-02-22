const field_size = 5, // размер ячейки, px
rows_number = 100, // кол-во строк
columns_number = 100 // кол-во столбцов
background_color = 'gray',
field_color = 'violet'; // цвет живой клетки
generation_time = 100;

const canvas = document.querySelector('canvas'); // передаем в canvas dom-элемент с тегом canvas
const context = canvas.getContext('2d');

const lifeGame = new LifeGame(rows_number, columns_number)  // создаем новый экземпляр класса LifeGame
console.log(lifeGame)

start();

function start() {
  canvas.width = field_size * columns_number; // задаем ширину канваса, берем 1 ячейку и * на кол-во колонок
  canvas.height = field_size * rows_number;
  console.log('started');

  lifeGame.reviveRandomFields(rows_number * columns_number / 2);  // оживляем половину поля
  clearCanvas();

  lifeGame.forFreeEach((x, y) => {drawField(x, y, field_color)})
  requestAnimationFrame(tick)
}

function tick(timestamp) {
  clearCanvas();

  if (timestamp > lifeGame.generationNumber * generation_time) {
    lifeGame.changeGeneration();
  }

  

  lifeGame.forFreeEach((x, y) => {drawField(x, y, field_color)});
  requestAnimationFrame(tick);
}

function clearCanvas() {
  context.fillStyle = background_color;
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fill();
}

function drawField (x, y, color) {
  context.fillStyle = color;
  context.beginPath();
  context.rect(x*field_size, y*field_size, field_size, field_size);
  context.fill();
}