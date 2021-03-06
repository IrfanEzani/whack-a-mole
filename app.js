const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let gameTime = 60000;

function randomTime(min, max) {
  return Math.floor(Math.random() * (max- min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]

  if (hole === lastHole) {
    return randomHole(holes)
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 800);
  const hole = randomHole(holes);

  hole.classList.add('up')

  setTimeout(() => {
    hole.classList.remove('up')
    if (!timeUp) peep()
  }, time)
}

function start() {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  peep();
  setTimeout(() => timeUp = true, gameTime)
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  scoreBoard.textContent = score;
}

moles.forEach((mole) => {
  mole.addEventListener('click', bonk)
});
