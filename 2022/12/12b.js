const fs = require('fs');

const actualFile = fs.readFileSync('2022/12/actual.txt', { encoding: 'utf8' });
const exampleFile = fs.readFileSync('2022/12/example.txt', {
  encoding: 'utf8',
});

const file = actualFile;
const lines = file.split('\n');
const input = lines.map((line) => line.split(''));

const alphabet = [
  'S',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'E',
];

const positionOfE = {};
positionOfE.y = lines.findIndex((line) => line.includes('E'));
positionOfE.x = input[positionOfE.y].findIndex((char) => char === 'E');

const emptyCell = { direction: null, spaces: Infinity };
const emptyRow = new Array(input[0].length)
  .fill()
  .map(() => ({ ...emptyCell }));
const map = new Array(lines.length).fill().map(() => emptyRow.slice());

let queue = [
  {
    coords: positionOfE,
    spaces: 0,
    direction: 'E',
  },
];
let nextQueue = [];

const getNode = (coords) => map[coords.y][coords.x];
const getIndex = (coords) =>
  alphabet.findIndex((letter) => letter === input[coords.y][coords.x]);
const checkDuplicate = (inputCoords) =>
  nextQueue.find(
    ({ coords }) => coords.x === inputCoords.x && coords.y === inputCoords.y
  ) === undefined;

while (queue.length > 0) {
  queue.forEach(({ coords: { x, y }, spaces, direction }) => {
    map[y][x] = { direction, spaces };

    const currentIndex = alphabet.findIndex((letter) => letter === input[y][x]);

    const left = { x: x - 1, y };
    if (direction !== '<' && left.x >= 0) {
      const leftNode = getNode(left);
      if (
        (leftNode.direction === null || spaces < leftNode.spaces) &&
        (getIndex(left) >= currentIndex - 1 ||
          (getIndex(left) === 27 && currentIndex >= 25) ||
          getIndex(left) === 2) &&
        checkDuplicate(left)
      ) {
        nextQueue.push({
          coords: left,
          spaces: spaces + 1,
          direction: '>',
        });
      }
    }

    const right = { x: x + 1, y };
    if (direction !== '>' && right.x < input[0].length) {
      const rightNode = getNode(right);
      if (
        (rightNode.direction === null || spaces < rightNode.spaces) &&
        (getIndex(right) >= currentIndex - 1 ||
          (getIndex(right) === 27 && currentIndex >= 25) ||
          getIndex(right) === 2) &&
        checkDuplicate(right)
      ) {
        nextQueue.push({
          coords: right,
          spaces: spaces + 1,
          direction: '<',
        });
      }
    }

    const up = { x, y: y - 1 };
    if (direction !== '^' && up.y >= 0) {
      const upNode = getNode(up);
      if (
        (upNode.direction === null || spaces < upNode.spaces) &&
        (getIndex(up) >= currentIndex - 1 ||
          (getIndex(up) === 27 && currentIndex >= 25) ||
          getIndex(up) === 2) &&
        checkDuplicate(up)
      ) {
        nextQueue.push({
          coords: up,
          spaces: spaces + 1,
          direction: 'v',
        });
      }
    }

    const down = { x, y: y + 1 };
    if (direction !== 'v' && down.y < lines.length) {
      const downNode = getNode(down);
      if (
        (downNode.direction === null || spaces < downNode.spaces) &&
        (getIndex(down) >= currentIndex - 1 ||
          (getIndex(down) === 27 && currentIndex >= 25) ||
          getIndex(down) === 2) &&
        checkDuplicate(down)
      ) {
        nextQueue.push({
          coords: down,
          spaces: spaces + 1,
          direction: '^',
        });
      }
    }
  });
  console.log(
    map
      .map((line) => line.map(({ direction }) => direction || '.').join(''))
      .join('\n')
  );
  console.log();

  queue = nextQueue;
  nextQueue = [];
}

let min = Infinity;
map.forEach((line, y) => {
  line.forEach(({ spaces }, x) => {
    if (input[y][x] === 'S' || (input[y][x] === 'a' && spaces < min)) {
      min = spaces;
    }
  });
});

console.log(min);
